"use client"

import { useToast } from "@/hooks/use-toast"
import { createStartup } from "@/lib/actions"
import { formSchema } from "@/lib/validation"
import MDEditor from "@uiw/react-md-editor"
import { SendIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const StartupForm = () => {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("")
  const { toast } = useToast()

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }

      await formSchema.parseAsync(formValues)
      const result = await createStartup(prevState, formData, pitch)
      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup has been created",
        })
        router.push(`/startup/${result._id}`)
      }

      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors

        setErrors(fieldErrors as unknown as Record<string, string>)
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        })

        return { ...prevState, error: "Valiation failed", status: "ERROR" }
      }

      toast({
        title: "Error",
        description: "An unexpected error has occured",
        variant: "destructive",
      })

      return {
        ...prevState,
        error: "An unexpected error has occured",
        status: "ERROR",
      }
    } finally {
      setErrors({})
      setPitch("")
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  })

  return (
    <form className="startup-form" action={formAction}>
      {/* TITLE */}
      <div>
        <label className="startup-form_label" htmlFor="title">
          Title
        </label>
        <Input
          className="startup-form_input"
          id="title"
          name="title"
          placeholder="Startup Title"
          required
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="startup-form_label" htmlFor="description">
          Description
        </label>
        <Textarea
          className="startup-form_textarea"
          id="description"
          name="description"
          placeholder="Startup Description"
          required
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      {/* CATEGORY */}
      <div>
        <label className="startup-form_label" htmlFor="category">
          Category
        </label>
        <Input
          className="startup-form_input"
          id="category"
          name="category"
          placeholder="Startup Category (Tech, Health, Education)"
          required
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>
      <div>
        <label className="startup-form_label" htmlFor="link">
          Image URL
        </label>
        <Input
          className="startup-form_input"
          id="link"
          name="link"
          placeholder="Startup Image URL"
          required
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label className="startup-form_label" htmlFor="pitch">
          Pitch
        </label>
        <MDEditor
          className="mt-3"
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          style={{
            border: "3px solid black",
            borderRadius: 20,
            boxShadow: "none",
            overflow: "hidden",
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>
      <Button
        className="startup-form_btn text-white"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Startup"}
        <SendIcon className="size-6 ml-2" />
      </Button>
    </form>
  )
}
export default StartupForm
