"use client";

export function GlobalStyles() {
  return (
    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }
    `}</style>
  );
}