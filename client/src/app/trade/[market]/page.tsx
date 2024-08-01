"use client";
import { Appbar } from "@/components/Appbar";
import { Depth } from "@/components/depth/Depth";
import { MarketBar } from "@/components/Marketbar";
import { SwapUI } from "@/components/SwapUI";
import { TradeView } from "@/components/TradeView";
import { useParams } from "next/navigation";
import "simplebar/dist/simplebar.css";

import "../../globals.css";

export default function Page() {
  const { market } = useParams();
  return (
    <div className="flex flex-row flex-1 overflow-x-hidden">
      <div className="flex flex-col flex-1">
        <Appbar />
        <MarketBar market={market as string} />
        <div className="flex flex-row h-[920px] border-y border-slate-800">
          <div className="flex flex-col flex-1">
            <TradeView market={market as string} />
          </div>
          <div className="flex flex-col w-[250px] overflow-hidden mr-1">
            <Depth market={market as string} />
          </div>
        </div>
      </div>

      <div className="w-[10px] flex-col border-slate-800 border-l"></div>
      <div>
        <div className="flex flex-col w-[280px] mr-1 ml-[-8px]">
          <SwapUI market={market as string} />
        </div>
      </div>
    </div>
  );
}
