import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Activity, Loader2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

const VoiceAgent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  const [error, setError] = useState<string | null>(null);
  
  // Refs for audio handling
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Refs for audio playback
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const scheduledSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  
  // Refs for visualization
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Audio Contexts
  const initAudio = async () => {
    try {
      // Input (Mic) - 16kHz
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      // Output (Speaker) - 24kHz
      const outputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputContextRef.current = outputContext;
      
      // Analyser for visualization
      const analyser = outputContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      return { stream, audioContext, outputContext };
    } catch (err) {
      console.error("Audio init error:", err);
      setError("Microphone access denied. Please check your browser settings and allow microphone access.");
      return null;
    }
  };

  // Connect to Gemini Live API
  const connectToGemini = async () => {
    setError(null);
    setStatus('connecting');
    
    const audioSetup = await initAudio();
    if (!audioSetup) {
      setStatus('idle');
      return;
    }

    const { stream, audioContext, outputContext } = audioSetup;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      setError("API Key missing. Cannot connect to AI.");
      setStatus('idle');
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    try {
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log("Gemini Live Connected");
            setStatus('listening');
            setIsActive(true);

            // Process Mic Input
            const source = audioContext.createMediaStreamSource(stream);
            sourceRef.current = source;
            
            const processor = audioContext.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Convert Float32 to PCM 16-bit
              const pcmData = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcmData[i] = inputData[i] * 32768;
              }
              
              const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                  }
                });
              });
            };

            source.connect(processor);
            processor.connect(audioContext.destination);
            
            // Start Visualizer
            drawVisualizer();
          },
          onmessage: async (msg: LiveServerMessage) => {
             // Handle Audio Output
             const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (audioData) {
               setStatus('speaking');
               await playAudioChunk(audioData, outputContext);
             }
             
             if (msg.serverContent?.turnComplete) {
                setStatus('listening');
             }
          },
          onclose: () => {
            console.log("Session closed");
            stopSession();
          },
          onerror: (err) => {
            console.error("Session error:", err);
            setError("Connection interrupted.");
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: "You are Loop Mafia, a sophisticated, helpful, and concise AI voice assistant for an automation agency. Keep responses short, professional, and warm.",
        }
      });
    } catch (err) {
      console.error("Connection failed:", err);
      setError("Failed to connect to Loop Mafia servers.");
      stopSession();
    }
  };

  const playAudioChunk = async (base64Data: string, ctx: AudioContext) => {
    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const int16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }
      
      const buffer = ctx.createBuffer(1, float32.length, 24000);
      buffer.copyToChannel(float32, 0);
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      
      // Connect to analyser for visualization
      if (analyserRef.current) {
        source.connect(analyserRef.current);
        analyserRef.current.connect(ctx.destination);
      } else {
        source.connect(ctx.destination);
      }

      const currentTime = ctx.currentTime;
      const start = Math.max(currentTime, nextStartTimeRef.current);
      source.start(start);
      nextStartTimeRef.current = start + buffer.duration;
      
      scheduledSourcesRef.current.push(source);
      
      source.onended = () => {
         const index = scheduledSourcesRef.current.indexOf(source);
         if (index > -1) scheduledSourcesRef.current.splice(index, 1);
         if (scheduledSourcesRef.current.length === 0) {
            // Optional: reset status to listening if desired, though onmessage handles turnComplete
         }
      };

    } catch (e) {
      console.error("Audio decode error", e);
    }
  };

  const stopSession = () => {
    setIsActive(false);
    setStatus('idle');
    
    // Cleanup Audio Contexts
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputContextRef.current) outputContextRef.current.close();
    
    // Stop Tracks
    streamRef.current?.getTracks().forEach(t => t.stop());
    
    // Stop Animation
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    
    // Clear Queues
    scheduledSourcesRef.current.forEach(s => s.stop());
    scheduledSourcesRef.current = [];
    nextStartTimeRef.current = 0;
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      
      ctx.beginPath();
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        const angle = (i * 2 * Math.PI) / bufferLength; // Circular layout
        
        const xStart = centerX + Math.cos(angle) * radius;
        const yStart = centerY + Math.sin(angle) * radius;
        
        const xEnd = centerX + Math.cos(angle) * (radius + barHeight);
        const yEnd = centerY + Math.sin(angle) * (radius + barHeight);
        
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
      }
      
      ctx.strokeStyle = '#C4A484'; // Clay color
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Inner Circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 5, 0, 2 * Math.PI);
      ctx.fillStyle = status === 'speaking' ? '#C4A484' : '#1A1A1A';
      ctx.fill();
    };
    
    draw();
  };

  return (
    <section id="demo" className="py-24 px-6 relative bg-deep-night overflow-hidden border-t border-white/5">
       {/* Background Effects */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-clay/5 rounded-full blur-[120px]" />

       <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-clay text-sm font-medium mb-6">
                <Activity size={14} className="animate-pulse" /> Live Demo
             </div>
             <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">Talk with Loop Mafia</h2>
             <p className="text-white/50 max-w-xl mx-auto">
               Experience our latency-free voice infrastructure. Click the button below to have a natural conversation with our AI agent.
             </p>
          </div>

          <div className="relative w-full h-[400px] rounded-[3rem] bg-black/40 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden shadow-2xl">
             
             {/* Visualizer Canvas */}
             <canvas 
               ref={canvasRef} 
               width={600} 
               height={400} 
               className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" 
             />

             {/* Main Interaction Button */}
             <div className="relative z-20">
                {!isActive ? (
                   <button 
                     onClick={connectToGemini}
                     disabled={status === 'connecting'}
                     className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-wheat hover:bg-clay transition-all duration-500 shadow-[0_0_40px_rgba(227,213,202,0.2)] hover:shadow-[0_0_60px_rgba(196,164,132,0.5)] hover:scale-110"
                   >
                      {status === 'connecting' ? (
                        <Loader2 className="w-8 h-8 text-charcoal animate-spin" />
                      ) : (
                        <Mic className="w-8 h-8 text-charcoal" />
                      )}
                      <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
                   </button>
                ) : (
                   <button 
                     onClick={stopSession}
                     className="relative flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-all duration-300 group"
                   >
                      <MicOff className="w-8 h-8 text-red-400" />
                      <span className="absolute -bottom-10 text-xs text-red-400 font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                         End Call
                      </span>
                   </button>
                )}
             </div>

             {/* Status Text */}
             <div className="mt-12 h-8">
                {isActive && (
                   <div className="flex items-center gap-2 text-wheat/80 font-mono text-sm tracking-widest uppercase">
                      <span className={`w-2 h-2 rounded-full ${status === 'speaking' ? 'bg-clay animate-pulse' : 'bg-green-500'}`} />
                      {status === 'speaking' ? 'Loop Mafia is speaking...' : 'Listening...'}
                   </div>
                )}
                {error && (
                   <p className="text-red-400 text-sm">{error}</p>
                )}
             </div>
          </div>
       </div>
    </section>
  );
};

export default VoiceAgent;