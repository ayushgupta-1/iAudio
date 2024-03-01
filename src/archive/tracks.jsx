/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Jl3OwVUoWRk
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"

export default function Component() {
  return (
    <div className="flex h-screen items-center justify-center gap-4 p-4">
      <div className="grid w-full max-w-3xl rounded-lg border shadow-lg bg-white">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-semibold">Audio Editor</h1>
        </div>
        <div className="grid gap-4 p-4">
          <div className="grid gap-2">
            <Label className="text-sm" htmlFor="file">
              Add audio
            </Label>
            <Input accept="audio/*" id="file" multiple type="file" />
          </div>
          <div className="border rounded-lg">
            <div className="h-14 flex items-center p-4">
              <Button className="rounded-full" size="icon" variant="ghost">
                <PlayIcon className="w-4 h-4" />
                <span className="sr-only">Play</span>
              </Button>
              <Button className="rounded-full" size="icon" variant="ghost">
                <PauseIcon className="w-4 h-4" />
                <span className="sr-only">Pause</span>
              </Button>
              <Button className="rounded-full" size="icon" variant="ghost">
                <MonitorStopIcon className="w-4 h-4" />
                <span className="sr-only">Stop</span>
              </Button>
              <Slider className="flex-1 mx-4">
                <div>
                  <div />
                </div>
                <div />
              </Slider>
              <Button className="rounded-full" size="icon" variant="ghost">
                <VolumeIcon className="w-4 h-4" />
                <span className="sr-only">Toggle volume</span>
              </Button>
            </div>
            <div className="grid gap-4 p-4 text-sm">
              <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <PlayIcon className="w-4 h-4" />
                  <span className="sr-only">Play</span>
                </Button>
                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                  <div className="text-right">0:00</div>
                  <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <PlayIcon className="w-4 h-4" />
                      <span className="sr-only">Play</span>
                    </Button>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                      <div className="text-right">0:00</div>
                      <div className="w-full">
                        <Progress value={25} />
                      </div>
                      <Button size="icon" variant="ghost">
                        <PlusIcon className="w-4 h-4" />
                        <span className="sr-only">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add</span>
                </Button>
              </div>
              <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <PlayIcon className="w-4 h-4" />
                  <span className="sr-only">Play</span>
                </Button>
                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                  <div className="text-right">0:00</div>
                  <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <PlayIcon className="w-4 h-4" />
                      <span className="sr-only">Play</span>
                    </Button>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                      <div className="text-right">0:00</div>
                      <div className="w-full">
                        <Progress value={25} />
                      </div>
                      <Button size="icon" variant="ghost">
                        <PlusIcon className="w-4 h-4" />
                        <span className="sr-only">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add</span>
                </Button>
              </div>
              <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                <Button className="rounded-full" size="icon" variant="ghost">
                  <PlayIcon className="w-4 h-4" />
                  <span className="sr-only">Play</span>
                </Button>
                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                  <div className="text-right">0:00</div>
                  <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                    <Button
                      className="rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <PlayIcon className="w-4 h-4" />
                      <span className="sr-only">Play</span>
                    </Button>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                      <div className="text-right">0:00</div>
                      <div className="w-full">
                        <Progress value={25} />
                      </div>
                      <Button size="icon" variant="ghost">
                        <PlusIcon className="w-4 h-4" />
                        <span className="sr-only">Add</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonitorStopIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="7" width="6" height="6" />
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
    </svg>
  );
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="4" height="16" x="6" y="4" />
      <rect width="4" height="16" x="14" y="4" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function VolumeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    </svg>
  );
}
