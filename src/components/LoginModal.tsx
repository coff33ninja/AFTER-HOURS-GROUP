import React from 'react';

export function LoginModal({
  closePortal,
  loginState,
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  attemptEmailAuth,
  attemptGoogleLogin,
  setLoginState
}: any) {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-center items-center px-4 backdrop-blur-sm">
      <button onClick={closePortal} className="absolute top-8 right-8 text-white hover:text-luxury-gold text-2xl cursor-pointer">&times;</button>
      
      <div className="max-w-md w-full bg-luxury-dark border border-luxury-gold/30 p-8 shadow-2xl shadow-luxury-gold/5 relative">
        {loginState !== 'error' ? (
          <div className="block text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-serif text-white mb-2">Secure Client Portal</h2>
              <p className="text-neutral-500 text-xs uppercase tracking-widest">Federated Identity Verification</p>
            </div>
            
            <div className="space-y-6">
              {authMode === 'login' && (
                <p className="text-neutral-400 text-sm font-light">
                  Access to the deeper areas of our network requires verification. Your identity remains strictly confidential.
                </p>
              )}
              {authMode === 'register' && (
                <p className="text-neutral-400 text-sm font-light">
                  Submit your dossier request for consideration.
                </p>
              )}
              
              <form onSubmit={attemptEmailAuth} className="space-y-4">
                <div>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email Address" 
                    required
                    className="w-full bg-black border border-neutral-800 text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition duration-300 font-mono text-sm" 
                  />
                </div>
                <div>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required
                    className="w-full bg-black border border-neutral-800 text-white px-4 py-3 focus:outline-none focus:border-luxury-gold transition duration-300 font-mono text-sm tracking-[0.5em]" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loginState === 'authenticating'}
                  className={`w-full bg-transparent border border-luxury-gold text-luxury-gold font-semibold uppercase tracking-[0.2em] py-3 text-sm hover:bg-luxury-gold hover:text-black transition duration-300 cursor-pointer ${loginState === 'authenticating' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {authMode === 'login' ? 'Authenticate' : 'Submit'}
                </button>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-neutral-800"></div>
                <span className="px-4 text-xs tracking-widest uppercase text-neutral-600">OR</span>
                <div className="flex-grow h-px bg-neutral-800"></div>
              </div>
              
              <button 
                onClick={attemptGoogleLogin} 
                type="button"
                disabled={loginState === 'authenticating'}
                className={`w-full bg-white text-black font-semibold uppercase tracking-[0.2em] py-4 text-sm hover:bg-gray-200 transition duration-300 flex items-center justify-center space-x-3 cursor-pointer ${loginState === 'authenticating' ? 'opacity-70 cursor-wait' : ''}`}
              >
                {!loginState || loginState === 'idle' ? (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Google {authMode === 'login' ? 'Login' : 'Signup'}</span>
                  </>
                ) : (
                  'AUTHENTICATING...'
                )}
              </button>

              <div className="text-center mt-6">
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-neutral-500 text-xs uppercase tracking-widest hover:text-luxury-gold transition duration-300 border-b border-transparent hover:border-luxury-gold pb-1"
                >
                  {authMode === 'login' ? 'Request Dossier Integration' : 'Return to Client Authentication'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-red-900/20 border border-red-500/50 text-red-500 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-red-500 font-serif text-xl mb-3">AUTHENTICATION FAILED</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-mono bg-black p-4 border border-neutral-800">
              Verification procedure aborted or failed. Identity could not be secured.
            </p>
            <button onClick={() => setLoginState('idle')} className="text-luxury-gold text-xs uppercase tracking-widest hover:text-white border-b border-luxury-gold/30 pb-1 cursor-pointer">
              Retry Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
