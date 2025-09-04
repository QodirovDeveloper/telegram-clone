import { Button } from "@/components/ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa"

const Social = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-1">
      <Button variant="outline">
         <span>Sign up whit google</span>
         <FaGoogle/>
      </Button>
      <Button variant="secondary">
        <span>Sign up whit github</span>
        <FaGithub/>
      </Button>
    </div>
  )
}

export default Social
