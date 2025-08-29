import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Fragment } from "@/generated/prisma";
import { useState } from "react";
import { Hint } from "@/components/hint";

interface Props {
    data: Fragment;
};

export function FragmentWeb({ data }: Props) {
    const [copied, setcopied] = useState(false);
    const [fragmentkey, setFragmentKey] = useState(0);

    const onRefresh =() =>{
        setFragmentKey((prev)=> prev+1);
    };

    const handleCopy =() =>{
        navigator.clipboard.writeText(data.sandboxUrl);
        setcopied(true);
        setTimeout(()=> setcopied(false), 2000)
    }
    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
                <Hint text="Refresh" side="bottom" align="start">
                <Button size="sm" variant="outline" onClick={onRefresh}>
                    <RefreshCcwIcon />
                </Button>
                </Hint>
                <Hint text="Click to copy" side="bottom">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    disabled={!data.sandboxUrl || copied}
                    className="flex-1 justify-start text-start font-normal"
                >
                    <span className="truncate">
                        {data.sandboxUrl}
                    </span>

                </Button>
                </Hint>
                <Hint text="Open in a new tab" side="bottom" align="start">
                <Button
                size="sm"
                disabled={!data.sandboxUrl}
                variant="outline"
                onClick={()=>{
                    if(!data.sandboxUrl) return;
                    window.open(data.sandboxUrl,"_blank");
                }}
                >
                    <ExternalLinkIcon/>
                </Button>
                </Hint>
            </div>
            <iframe
            key={fragmentkey}
                className="h-full w-fUll"
                sandbox="allow-forms allow-scripts allow-same-origin"
                loading="lazy"
                src={data.sandboxUrl}
            />
        </div>
    )
}