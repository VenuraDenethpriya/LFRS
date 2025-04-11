import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqItems = [
  {
    question: "How can we help you?",
    answer: "Our team is here to assist you with any questions or concerns you may have.",
  },
  {
    question: "What services do you offer?",
    answer: "We provide a wide range of services tailored to meet your specific needs.",
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team 24/7 through email, phone, or live chat.",
  },
]

export default function Questions() {
  return (
    <div className="min-h-fit bg-slate-200 p-6 flex items-center justify-center">
      <Card className="w-full  mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="hidden sm:text-4xl font-bold text-blue-600">FAQs</CardTitle>
          <p className="hidden sm:text-blue-600 text-xl">we are here to answer all your questions</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-8">
          <div className="grid sm:grid-cols-2 grid-cols-1">
            <div>
              <div className="w-64 h-64 mb-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(20)-J3J7ww6SIVq0u8ypPCWGphITafZaOm.png"
                  alt="FAQ Illustration"
                  className="block w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <div className="grid gap-4 w-full max-w-2xl">
                {faqItems.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                    <h3 className="font-semibold text-blue-600 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

