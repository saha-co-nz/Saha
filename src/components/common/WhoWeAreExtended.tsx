import React from "react";
import Link from "next/link";
type Props = {
  onBack: () => void; // for mobile back button
  onLinkClick: () => void; // for link clicks
};

export default function WhoWeAreExtended({ onBack, onLinkClick }: Props) {
  return (
    <div className=" text-white bg-black h-auto lg:py-8">
      {/*Desktop*/}
      <div className="hidden md:flex flex-row px-16 py-4">
        <div className="border-r-2 pr-16">
          <h2 className="text-2xl pb-8">Who We Are</h2>
          <p className="text-sm break-normal w-56 pb-8">
            At Saha, we help clients build trust and reinvent so they can turn
            complexity into competitive advantage. We&apos;re passionate about
            helping businesses&apos; succeed, the public sector to achieve more,
            and our communities to grow.
          </p>
          <Link href="/whoweare" onClick={onLinkClick}>
            <button>Explore</button>
          </Link>
        </div>
        <div className="flex flex-col flex-1 pl-16 justify-center">
          <Link
            href="/whoweare"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-xl">Overview</h2>
          </Link>
          <Link
            href="/whoweare#governance"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-xl">Governance</h2>
          </Link>
          <Link
            href="/whoweare/#values"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-xl">Our Values</h2>
          </Link>
          <Link
            href="/whoweare#people"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-xl">Our People</h2>
          </Link>
        </div>
      </div>

      {/*Mobile*/}
      <div className="flex md:hidden flex-col p-8 gap-8">
        <div className="flex flex-row items-center gap-8">
          <h2 className="text-2xl">Who We Are</h2>
          <button onClick={onBack}>Back</button>
        </div>

        <p className="text-xs md:text-sm break-normal">
          At Saha, we help clients build trust and reinvent so they can turn
          complexity into competitive advantage. We&apos;re passionate about
          helping businesses&apos; succeed, the public sector to achieve more,
          and our communities to grow.
        </p>
        <div className="flex flex-col">
          <Link
            href="/whoweare"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-lg md:text-xl">Overview</h2>
          </Link>
          <Link
            href="/whoweare#governance"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-lg md:text-xl">Governance</h2>
          </Link>
          <Link
            href="/whoweare/#values"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-lg md:text-xl">Our Values</h2>
          </Link>
          <Link
            href="/whoweare#people"
            className="border-b p-4 hover:bg-white hover:text-black"
            onClick={onLinkClick}
          >
            <h2 className="text-lg md:text-xl">Our People</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
