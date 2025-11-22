import React, { useState, useRef, useCallback, useEffect } from 'react';
import { describeImage } from './services/geminiService';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { PowerIcon, AnalyzingIcon, SpeakingIcon, ErrorIcon } from './components/Icons';

type Status = 'IDLE' | 'STARTING' | 'ANALYZING' | 'CAPTURING' | 'SPEAKING' | 'ERROR' | 'STOPPING' | 'WAITING';

const STATUS_MESSAGES: Record<Status, string> = {
  IDLE: 'Ready to see',
  STARTING: 'Initializing camera...',
  ANALYZING: 'Analyzing scene...',
  CAPTURING: 'Capturing image...',
  SPEAKING: 'Describing scene...',
  ERROR: 'An error occurred',
  STOPPING: 'Vision stopped',
  WAITING: 'Listening...',
};

const App: React.FC = () => {
  const [status, setStatus] = useState<Status>('IDLE');
  const [description, setDescription] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analysisIntervalRef = useRef<any>(null);
  const isProcessingRef = useRef<boolean>(false);

  const { speak, cancel, isSpeaking } = useSpeechSynthesis();

  const startCamera = async () => {
    setStatus('STARTING');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsRunning(true);
          startAnalysisLoop();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setStatus('ERROR');
        setErrorMessage('Camera access denied. Please enable camera permissions in your browser settings.');
        setIsRunning(false);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureAndAnalyze = useCallback(async () => {
    if (isProcessingRef.current || isSpeaking) return;

    isProcessingRef.current = true;
    setStatus('CAPTURING');
    
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
        
        setStatus('ANALYZING');
        try {
          const newDescription = await describeImage(base64Image);
          setDescription(newDescription);
          setStatus('SPEAKING');
          await speak(newDescription);
          if (isRunning) {
             setStatus('WAITING');
          }
        } catch (err) {
          console.error('Error during analysis:', err);
          setStatus('ERROR');
          const errorText = err instanceof Error ? err.message : 'Unknown analysis error.';
          setErrorMessage(errorText);
          await speak(`Error: ${errorText}`);
        }
      }
    }

    isProcessingRef.current = false;
  }, [speak, isSpeaking, isRunning]);

  const startAnalysisLoop = () => {
    // Initial call
    captureAndAnalyze();
    // Subsequent calls
    analysisIntervalRef.current = setInterval(captureAndAnalyze, 7000); // 7-second interval
  };

  const stopAnalysisLoop = () => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
  };

  const handleToggle = async () => {
    if (isRunning) {
      setStatus('STOPPING');
      setIsRunning(false);
      stopAnalysisLoop();
      stopCamera();
      cancel();
      isProcessingRef.current = false;
      setDescription('');
      setErrorMessage('');
      setStatus('IDLE');
    } else {
      await startCamera();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopAnalysisLoop();
      stopCamera();
      cancel();
    };
  }, [cancel]);

  const getStatusIcon = () => {
    if (!isRunning && status !== 'ERROR') return <PowerIcon className="w-8 h-8 text-white" />;
    switch (status) {
      case 'ANALYZING':
      case 'CAPTURING':
      case 'STARTING':
        return <AnalyzingIcon className="w-8 h-8 text-white animate-spin" />;
      case 'SPEAKING':
        return <SpeakingIcon className="w-8 h-8 text-white" />;
      case 'ERROR':
        return <ErrorIcon className="w-8 h-8 text-white" />;
      default:
        return <PowerIcon className="w-8 h-8 text-white" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'ANALYZING':
      case 'CAPTURING':
      case 'STARTING':
        return 'from-blue-500 to-cyan-500';
      case 'SPEAKING':
        return 'from-green-500 to-emerald-500';
      case 'ERROR':
        return 'from-red-500 to-rose-500';
      case 'WAITING':
        return 'from-purple-500 to-indigo-500';
      default:
        return isRunning ? 'from-red-500 to-rose-600' : 'from-green-500 to-emerald-600';
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans antialiased">
      {/* Video Background */}
      <video 
        ref={videoRef} 
        className="absolute top-0 left-0 w-full h-full object-cover z-0" 
        playsInline 
        muted 
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />

      {/* Main Content */}
      <div className="relative z-20 w-full h-full flex flex-col">
        {/* Header */}
        <div className="pt-6 px-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Vision Assistant
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">AI-Powered Scene Description</p>
            </div>
            {isRunning && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-300">Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Card */}
        <div className="px-6 mb-4">
          <div className={`bg-gradient-to-r ${getStatusColor()} rounded-2xl p-4 shadow-2xl backdrop-blur-xl bg-opacity-90 border border-white/10`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {(status === 'ANALYZING' || status === 'CAPTURING' || status === 'STARTING') && (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <AnalyzingIcon className="w-5 h-5 text-white animate-spin" />
                  </div>
                )}
                {status === 'SPEAKING' && (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <SpeakingIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                {status === 'ERROR' && (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ErrorIcon className="w-5 h-5 text-white" />
                  </div>
                )}
                {(status === 'IDLE' || status === 'WAITING') && (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <PowerIcon className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white/90 uppercase tracking-wide">
                  {status === 'ERROR' ? 'Error' : 'Status'}
                </p>
                <p className="text-base font-semibold text-white mt-0.5 truncate">
                  {status === 'ERROR' ? errorMessage : STATUS_MESSAGES[status]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="flex-1 px-6 overflow-y-auto pb-4">
          {description ? (
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20 fade-in">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white/80 mb-1">Scene Description</h3>
                  <p className="text-lg leading-relaxed text-white font-medium">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">
                  {isRunning ? 'Analyzing your surroundings...' : 'Start vision to see descriptions'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Control Button */}
        <div className="pb-8 px-6 pt-4">
          <div className="flex items-center justify-center">
            <button
              onClick={handleToggle}
              className={`
                relative w-20 h-20 rounded-full flex items-center justify-center
                transition-all duration-300 ease-out
                transform active:scale-95
                shadow-2xl
                focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${isRunning 
                  ? 'bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:ring-red-400/50' 
                  : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-400/50'
                }
                ${status === 'STARTING' ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105'}
              `}
              aria-label={isRunning ? 'Stop Vision' : 'Start Vision'}
              disabled={status === 'STARTING'}
            >
              {/* Ripple Effect */}
              {isRunning && (
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              )}
              
              {/* Icon */}
              <div className="relative z-10">
                {getStatusIcon()}
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${
                isRunning ? 'bg-red-400' : 'bg-green-400'
              }`} />
            </button>
          </div>
          
          {/* Helper Text */}
          <p className="text-center text-xs text-gray-400 mt-4 font-medium">
            {isRunning ? 'Tap to stop vision' : 'Tap to start vision'}
          </p>
        </div>
      </div>
    </main>
  );
};

export default App;