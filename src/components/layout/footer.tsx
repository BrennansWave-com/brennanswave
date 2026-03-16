import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="pt-8 pb-4 px-4 bg-gray-100 text-center">
      <div className="container mx-auto">
        <div className="mb-6 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1302.1757848326677!2d-113.9970382421236!3d46.86891509568197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x535dcd001b1bcf0f%3A0x169f85e1790162d0!2sRiver%20Surfing!5e0!3m2!1sen!2sus!4v1755065897215!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <Separator />
        <div className="text-center py-4">
          <Link href="/" className="text-xl font-bold flex flex-col gap-2 items-center justify-center">
            <Image src="/kayaker-wave.svg" alt="Kayaker Wave" width={64} height={64} className="object-fit mx-auto"/>
            <span>Brennan&apos;s Wave</span>
          </Link>
        </div>
        <Separator />
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>
          &copy; {currentYear} Brennanswave. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:underline transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;