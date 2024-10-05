// 'use client'

// import { useState } from 'react'
// import { X, Image } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// type ExportFormat = 'PNG' | 'JPEG'

// export default function ExportDataPopup() {
//   const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('PNG')
//   const [isVisible, setIsVisible] = useState(true) // Add visibility state

//   const handleExport = (format: ExportFormat) => {
//     console.log(`Exporting map as ${format}`)
//     // In a real application, you would implement the actual export logic here
//   }

//   const handleClose = () => {
//     console.log('Export popup closed')
//     setIsVisible(false) // Hide the popup
//   }

//   // If the popup is not visible, return null (don't render anything)
//   if (!isVisible) return null

//   return (
//     <div className="fixed top-10 right-0 p-4 z-50"> {/* Adjust position here */}
//       <Card className="w-[400px] max-w-full">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-2xl font-semibold">Export Data</CardTitle>
//           <Button variant="ghost" size="icon" onClick={handleClose}>
//             <X className="h-4 w-4" />
//             <span className="sr-only">Close</span>
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {(['PNG', 'JPEG'] as ExportFormat[]).map((format) => (
//             <div 
//               key={format}
//               className={`flex items-center justify-between p-4 rounded-lg border-2 ${
//                 selectedFormat === format ? 'border-primary bg-primary/10' : 'border-border'
//               }`}
//               onClick={() => setSelectedFormat(format)}
//             >
//               <div className="flex items-center space-x-4">
//                 <div className={`w-12 h-12 rounded flex items-center justify-center ${format === 'PNG' ? 'bg-purple-100' : 'bg-green-100'}`}>
//                   <Image className={`h-6 w-6 ${format === 'PNG' ? 'text-purple-600' : 'text-green-600'}`} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold">{format} Map</h3>
//                   <p className="text-sm text-muted-foreground">Sending {format} Format</p>
//                 </div>
//               </div>
//               <Button 
//                 onClick={() => handleExport(format)}
//                 className="custom-gradient text-primary-foreground hover:bg-primary/90"
//               >
//                 Export
//               </Button>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
