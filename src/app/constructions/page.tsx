"use client";

import Image from "next/image";

export default function UnderConstructionPage() {
  return (
    <>
      {/* Main Content */}
      <div className="font-sans flex flex-col px-6 items-center justify-center min-h-screen relative z-10">
        <main className="flex flex-col justify-center items-center">
          <div className="fixed -z-10 inset-0 w-full h-full overflow-hidden">
            <Image
              className="w-full h-full object-cover"
              src="/gif/brennansGifLow.gif"
              alt=""
              width={800}
              height={800}
              priority
            />
          </div>
          <div className="flex mt-16 flex-col mx-6 justify-center items-start border-6 border-black/20 p-2 md:p-4 lg:p-8 backdrop-blur-[5px] bg-white/10 rounded-lg">
            <h1 className="text-xl font-extrabold md:text-2xl lg:text-3xl xl:text-4xl text-black/80 text-center mb-2">
              Brennans👋.com
            </h1>
            <h3 className="text-xl font-extrabold decoration-pink-500 md:text-2xl lg:text-3xl xl:text-4xl text-black/80 text-center">
              is under construction🚧
            </h3>
          </div>
        </main>
      </div>
    </>
  );
}
