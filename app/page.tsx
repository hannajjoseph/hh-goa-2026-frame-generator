"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
export default function Home() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoPosition, setPhotoPosition] = useState("center center");
  const [name, setName] = useState("");
  const [stack, setStack] = useState("");
  const [generated, setGenerated] = useState(false);
  const [builderTitle, setBuilderTitle] = useState("");

  const passRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  const image = new Image();

  image.onload = () => {
    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const ratio = width / height;

    let position = "center center";

    if (ratio > 1.6) {
      // Very wide landscape
      position = "center center";
    } else if (ratio < 0.65) {
      // Very tall portrait
      position = "center 35%";
    } else {
      // Normal portrait / square / landscape
      position = "center center";
    }

    setPhotoPosition(position);
    setPhoto(imageUrl);
  };

  image.src = imageUrl;
};

  const handleGenerate = () => {
  if (!photo) {
    alert("Please upload your photo first.");
    return;
  }

  if (!name.trim()) {
    alert("Please enter your name.");
    return;
  }

    if (!stack.trim()) {
    alert("Please enter your stack or role.");
    return;
  }

  const role = stack.toLowerCase();

  let title = "BUILD NOMAD";

  if (
    role.includes("ai") ||
    role.includes("machine learning") ||
    role.includes("ml")
  ) {
    title = "NEURAL NOMAD";
  } else if (
    role.includes("web") ||
    role.includes("frontend") ||
    role.includes("full stack") ||
    role.includes("developer")
  ) {
    title = "PIXEL PIRATE";
  } else if (
    role.includes("design") ||
    role.includes("ui") ||
    role.includes("ux")
  ) {
    title = "PIXEL ALCHEMIST";
  } else if (
    role.includes("data") ||
    role.includes("analytics")
  ) {
    title = "DATA EXPLORER";
  } else if (
    role.includes("cyber") ||
    role.includes("security")
  ) {
    title = "CODE GUARDIAN";
  } else if (
    role.includes("hardware") ||
    role.includes("iot") ||
    role.includes("robot")
  ) {
    title = "CIRCUIT NOMAD";
  }

  setBuilderTitle(title);
  setGenerated(true);
};

const handleDownload = async () => {
  if (!passRef.current) return;

  try {
    const canvas = await html2canvas(passRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#075C3E",
    });

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.download = `HH-Goa-2026-${name
      .trim()
      .replace(/\s+/g, "-")}.png`;

    link.href = dataUrl;
    link.click();

  } catch (error) {
    console.error("Failed to generate image:", error);

    alert(
      "Sorry, the pass could not be downloaded. Please try again."
    );
  }
};

  return (
    <main className="min-h-screen bg-[#f6f1e5] text-[#063f2f]">

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-xl font-black tracking-tight">
            HH GOA
          </p>

          <p className="text-xs font-bold tracking-[0.25em]">
            2026
          </p>
        </div>

        <div className="rounded-full border border-[#063f2f]/20 px-4 py-2 text-sm font-semibold">
          Frame / ID Generator
        </div>
      </header>

      {/* Main content */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-6 sm:px-6 md:grid-cols-2 md:gap-10 md:pb-16 md:pt-8">

        {/* Left side */}
        <div className="flex flex-col justify-center">

          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em]">
            Hacker House Goa 2026
          </p>

          <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
            BUILD YOUR
            <br />
            BUILDER
            <br />
            PASS.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#063f2f]/65">
            Upload your photo, add your name and stack,
            and create your HH Goa 2026 identity.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-[#063f2f]/20 bg-white/60 px-4 py-2 text-sm font-semibold">
              📸 Upload Photo
            </span>

            <span className="rounded-full border border-[#063f2f]/20 bg-white/60 px-4 py-2 text-sm font-semibold">
              ⚡ Auto Builder
            </span>

            <span className="rounded-full border border-[#063f2f]/20 bg-white/60 px-4 py-2 text-sm font-semibold">
              🌴 HH Goa
            </span>
          </div>

        </div>

        {/* Form */}
        <div className="rounded-[28px] bg-white p-6 shadow-xl md:p-8">

          <h2 className="text-2xl font-black">
            Create your pass
          </h2>

          <p className="mt-1 text-sm text-[#063f2f]/55">
            No login. No signup. Just build.
          </p>

          {/* Photo upload */}
          <div className="mt-7">

            <label className="mb-2 block text-sm font-bold">
              Builder Photo
            </label>

            <label className="block cursor-pointer">

              <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#063f2f]/25 bg-[#faf5e9] transition hover:border-[#063f2f]/50">

                {photo ? (
                  <div className="relative h-[220px] w-full">

                    <img
                      src={photo}
                      alt="Uploaded builder"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-bold text-white">
                      Click to change photo
                    </div>

                  </div>
                ) : (
                  <div className="text-center">

                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#063f2f] text-3xl">
                      ↑
                    </div>

                    <p className="font-bold">
                      Drop your photo here
                    </p>

                    <p className="mt-1 text-sm text-[#063f2f]/50">
                      or click to browse
                    </p>

                    <p className="mt-3 text-xs text-[#063f2f]/45">
                      JPG, PNG, WEBP or HEIC
                    </p>

                  </div>
                )}

              </div>

              <input
                type="file"
                accept="image/*,.heic,.heif"
                onChange={handlePhotoUpload}
                className="hidden"
              />

            </label>

          </div>

          {/* Full name */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Hannah J Joseph"
              className="w-full rounded-xl border border-[#063f2f]/20 bg-[#faf5e9] px-5 py-4 outline-none transition placeholder:text-[#063f2f]/35 focus:border-[#063f2f]"
            />

          </div>

          {/* Stack */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-bold">
              Stack / Role
            </label>

            <input
              type="text"
              value={stack}
              onChange={(event) => setStack(event.target.value)}
              placeholder="e.g. AI / Data Science"
              className="w-full rounded-xl border border-[#063f2f]/20 bg-[#faf5e9] px-5 py-4 outline-none transition placeholder:text-[#063f2f]/35 focus:border-[#063f2f]"
            />

          </div>

          {/* Generate button */}
          <button
  type="button"
  onClick={handleGenerate}
  className="mt-7 w-full rounded-xl bg-[#063f2f] px-5 py-4 text-lg font-black text-yellow-300 shadow-lg transition hover:scale-[1.01] hover:bg-[#07533e]"
>
  Generate Pass →
</button>

        </div>

      </section>

{generated && (
  <section className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">

    <div className="mb-8 text-center">
      <p
        className="text-xs font-black uppercase tracking-[0.35em]"
        style={{ color: "#F22673" }}
      >
        YOUR HH GOA 2026 ID
      </p>

      <h2
        className="mt-2 text-3xl font-black tracking-tight sm:text-4xl"
        style={{ color: "#075C3E" }}
      >
        Your Builder Identity
      </h2>
    </div>

    {/* =====================================================
    FINAL HH GOA 2026 PASS
   ===================================================== */}

<div
  ref={passRef}
  className="relative mx-auto w-full max-w-[760px] overflow-hidden"
  style={{
    aspectRatio: "1086 / 1448",
  }}
>

  {/* =====================================================
      COMPLETE REFERENCE BACKGROUND
      Everything except the ID card is already here.
     ===================================================== */}

  <img
  src="/goa-bg-2026.png"
  alt="HH Goa 2026"
  className="absolute inset-0 h-full w-full object-cover"
/>


  {/* =====================================================
      DYNAMIC BUILDER ID CARD
     ===================================================== */}

  <div
    className="absolute"
    style={{
  left: "23.5%",
  top: "25.6%",
  width: "53%",
  height: "43.5%",
}}
  >

    <div
  className="identity-card relative h-full w-full overflow-hidden rounded-[28px] border-[3px] p-[3.2%]"
      style={{
        backgroundColor: "#FFF7E6",
        borderColor: "#075C3E",
        boxShadow: "0 12px 30px rgba(0,0,0,0.20)",
      }}
    >

      {/* CARD SLOT */}
<div className="flex justify-center">
  <div
    className="h-[10px] w-[70px] rounded-full border-2"
    style={{
      backgroundColor: "#FFF7E6",
      borderColor: "#075C3E",
    }}
  />
</div>

{/* =====================================================
    MAIN IDENTITY SECTION
   ===================================================== */}

<div className="mt-[3%] grid grid-cols-[44%_56%] gap-[4%]">

  {/* ================= PHOTO ================= */}

  <div className="min-w-0">

    <div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px] border-[3px]"
      style={{
        backgroundColor: "#E7DCC4",
        borderColor: "#075C3E",
      }}
    >

      {photo && (
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover"
          style={{
            objectPosition: photoPosition,
          }}
        />
      )}

      <div
        className="absolute bottom-2 left-2 rounded-md px-2 py-1"
        style={{
          backgroundColor: "#075C3E",
        }}
      >
        <span
          className="text-[6px] font-black uppercase tracking-[0.15em]"
          style={{
            color: "#FFD21C",
          }}
        >
          BUILDER
        </span>
      </div>

    </div>

  </div>


  {/* ================= BUILDER DETAILS ================= */}

  <div className="flex min-w-0 flex-col justify-center">

    {/* NAME */}

    <div>

      <p
        className="text-[7px] font-black uppercase tracking-[0.22em]"
        style={{
          color: "#E72B67",
        }}
      >
        NAME
      </p>

      <p
        className="mt-1 break-words text-[clamp(15px,2.5vw,28px)] font-black uppercase leading-[0.95]"
        style={{
          color: "#075C3E",
        }}
      >
        {name}
      </p>

    </div>


    {/* PINK DIVIDER */}

    <div
      className="my-[6%] h-[2px] w-full"
      style={{
        backgroundColor: "#E72B67",
      }}
    />


    {/* YOUR STACK / ROLE */}

    <div className="mt-[8%]">

      <p
        className="text-[7px] font-black uppercase tracking-[0.2em]"
        style={{
          color: "#E72B67",
        }}
      >
        YOUR STACK / ROLE
      </p>

      <p
        className="mt-1 break-words text-[clamp(10px,1.6vw,17px)] font-black uppercase leading-tight"
        style={{
          color: "#075C3E",
        }}
      >
        {stack}
      </p>


    </div>

          {/* BUILDER TITLE */}

  <div className="mt-[5%]">

    <p
      className="text-[7px] font-black uppercase tracking-[0.2em]"
      style={{
        color: "#E72B67",
      }}
    >
      BUILDER TITLE
    </p>

    <p
      className="mt-1 break-words text-[clamp(10px,1.6vw,17px)] font-black uppercase leading-tight"
      style={{
        color: "#075C3E",
      }}
    >
      {builderTitle}
    </p>

  </div>

  </div>

</div>

<div className="mt-[6%]">


</div>

{/* =====================================================
    HORIZONTAL DIVIDER
   ===================================================== */}

<div
  className="mt-[4%] h-[2px] w-full"
  style={{
    backgroundColor: "#E72B67",
  }}
/>


{/* =====================================================
    CURRENTLY + FUEL
   ===================================================== */}

<div className="mt-[3%] grid grid-cols-2">

  {/* CURRENTLY */}

  <div className="pr-[8%]">

    <p
      className="text-[7px] font-black uppercase tracking-[0.2em]"
      style={{
        color: "#E72B67",
      }}
    >
      CURRENTLY
    </p>

    <p
      className="mt-1 text-[clamp(10px,1.5vw,16px)] font-black uppercase leading-tight"
      style={{
        color: "#075C3E",
      }}
    >
      BUILDING
      <br />
      THE FUTURE
    </p>

  </div>


  {/* FUEL */}

  <div
    className="border-l-2 pl-[8%]"
    style={{
      borderColor: "#E72B67",
    }}
  >

    <p
      className="text-[7px] font-black uppercase tracking-[0.2em]"
      style={{
        color: "#E72B67",
      }}
    >
      FUEL
    </p>

    <p
      className="mt-1 text-[clamp(10px,1.5vw,16px)] font-black uppercase leading-tight"
      style={{
        color: "#075C3E",
      }}
    >
      &lt;/&gt;
      <br />
      VS CODE
    </p>

  </div>

</div>


{/* =====================================================
    SMALL CARD FOOTER
   ===================================================== */}

<div className="mt-[2%] flex items-center justify-between">

  <span
    className="text-[5px] font-black uppercase tracking-[0.18em]"
    style={{
      color: "#075C3E",
    }}
  >
    HH GOA 2026
  </span>

  <span
    className="text-[5px] font-black uppercase tracking-[0.18em]"
    style={{
      color: "#E72B67",
    }}
  >
    #FRAMEINGOA
  </span>

</div>
    </div>

  </div>

</div>


    {/* =====================================================
        BUTTONS
       ===================================================== */}

    <div className="mx-auto mt-7 flex max-w-[760px] flex-col gap-3 sm:flex-row">

      <button
        type="button"
        onClick={handleDownload}
        className="flex-1 rounded-full px-6 py-4 text-sm font-black shadow-lg transition hover:-translate-y-0.5"
        style={{
          backgroundColor: "#075C3E",
          color: "#FFD21C",
        }}
      >
        ↓ Download Pass
      </button>


      <button
        type="button"
        onClick={() => {

          const caption =
            `Just built my HH Goa 2026 Builder Pass 🌴 #FrameInGoa`;

          const xUrl =
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              caption
            )}`;

          window.open(
            xUrl,
            "_blank",
            "noopener,noreferrer"
          );

        }}
        className="flex-1 rounded-full px-6 py-4 text-sm font-black shadow-lg transition hover:-translate-y-0.5"
        style={{
          backgroundColor: "#F22673",
          color: "#FFF7E6",
        }}
      >
        𝕏 Share to X
      </button>

    </div>

  </section>
)}

</main>
  );
}