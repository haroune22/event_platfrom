
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import type { Dispatch, SetStateAction } from "react"

type EducationFieldsProps = {
  level: string
  setLevel: Dispatch<SetStateAction<string>>
  extraLinks: string
  setExtraLinks: Dispatch<SetStateAction<string>>
}

const EducationFields = ({
  extraLinks,
  setExtraLinks,
  level,
  setLevel,
}: EducationFieldsProps) => {
  return (
    <>
      <div className="rounded-xl border border-green-100 bg-green-50/40 p-5">
        <h3 className="mb-4 font-semibold text-green-700">
          🎓 Education Details
        </h3>

        <p className="text-sm text-orange-600">
          Teach something to your community.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-gray-700">
          Resources
        </Label>

        <Input
          value={extraLinks}
          onChange={(e) => setExtraLinks(e.target.value)}
          placeholder="https://github.com/..."
          className="h-11 border-gray-300"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-gray-700">
          Level
        </Label>

        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-full border-gray-300">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-white shadow-lg">
            <SelectGroup>
              <SelectItem value="beginner">
                Beginner
              </SelectItem>

              <SelectItem value="intermediate">
                Intermediate
              </SelectItem>

              <SelectItem value="advanced">
                Advanced
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export default EducationFields
