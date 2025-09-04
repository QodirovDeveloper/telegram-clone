import { FaTelegram } from "react-icons/fa"
import StateAuth from "./_component/state"
import Social from "./_component/social"
import { ModeToggle } from "@/components/ui/shared/mode-toggle"

const Page = () => {
  return (
    <div className="container max-w-md w-full mx-auto flex h-screen items-center justify-center space-y-4 flex-col  pl-4 pr-4">
      <FaTelegram size={120} className="text-blue-500" />
      <div className="flex items-center space-x-2">
        <h1 className="text-4xl font-bold">Telegram</h1>
        <ModeToggle/>
      </div>

      <StateAuth />
      <Social />
    </div>
  )
}

export default Page
