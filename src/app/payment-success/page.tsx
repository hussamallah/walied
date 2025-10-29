"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/get-whatsapp-link?session_id=${sessionId}`)
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.error || 'Failed to fetch session details') });
          }
          return res.json();
        })
        .then(data => {
          if (data.whatsappUrl) {
            setStatus('redirecting');
            window.location.href = data.whatsappUrl;
          } else {
            throw new Error('Could not retrieve WhatsApp link.');
          }
        })
        .catch(err => {
          console.error(err);
          setError(err.message);
          setStatus('error');
        });
    } else {
        setStatus('error');
        setError('No session ID found.');
    }
  }, [sessionId]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      {status === 'processing' && (
        <>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅ Payment Successful!</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Finalizing your plan... Please wait.</p>
          <div className="loader"></div>
        </>
      )}
      {status === 'redirecting' && (
        <>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀 Redirecting you to WhatsApp...</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Please wait a moment.</p>
          <div className="loader"></div>
        </>
      )}
      {status === 'error' && (
         <>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ef4444' }}>❌ An Error Occurred</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{error || 'Could not process your payment details.'}</p>
            <p style={{ fontSize: '1rem' }}>Please contact us directly on WhatsApp to resolve this.</p>
          </>
      )}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #fbbf24;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


export default function SuccessPage() {
    return (
        <Suspense fallback={<div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#0f172a',
          color: 'white',
        }}>Loading...</div>}>
            <SuccessPageContent />
        </Suspense>
    )
}
