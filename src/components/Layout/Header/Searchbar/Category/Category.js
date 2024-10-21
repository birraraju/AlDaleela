import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";

export default function Category({ inputClicked, isLangArab, setInputClicked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [categoryClasses, setCategoryClasses] = useState([]);
  const { contextMapView } = useAuth();

  const handleCategorySelect = (categoryName) => {
    contextMapView.map.layers.items.forEach(function (layer) {
      layer.definitionExpression = `Class = '${categoryName}'`;
    });
    setSelectedCategory(categoryName); // Set selected category
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    const loadCategoryClasses = async () => {
      const featureLayer = new FeatureLayer({
        url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/IslandNamingProject_v2/FeatureServer/0",
        outFields: ["*"],
      });

      try {
        const query = featureLayer.createQuery();
        query.where = "1=1";
        query.returnGeometry = true;
        query.outFields = ["*"];
        const results = await featureLayer.queryFeatures(query);
        const features = results.features;
        const categorySearch = [...new Set(features.map(feature => feature.attributes.Class))];
        setCategoryClasses(categorySearch);
      } catch (error) {
        console.error("Error querying feature layer:", error);
      }
    };
    loadCategoryClasses();
  }, []);

  return (
    <div
      onClick={() => setInputClicked(false)}
      className="absolute bottom-1 right-1.5 z-[2]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full flex justify-center items-center mobile_s:px-2 laptop_m:px-4 py-2 sm:h-6 h-7 bg-white bg-opacity-50 ${
          inputClicked ? "text-black" : "text-white"
        }`}
      >
        {(selectedCategory === "Category") ? (isLangArab ? "الفئة" : selectedCategory) : selectedCategory}
        {isOpen ? (
          <FaCaretUp className="ml-2" />
        ) : (
          <FaCaretDown className="ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute w-28 h-44 border rounded bg-white shadow-lg overflow-y-scroll categories-scroll mt-1">
          <div>
            {categoryClasses.map((category, index) => (
              <div
                key={index} // Using index as key since category names may not be unique
                className="text-base p-2 cursor-pointer text-black hover:bg-gray-100"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



















// ==================================================================================================

// import { Button } from "../../../../ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../../../../ui/popover";
// import { useEffect, useState } from "react";
// import { FaCaretDown, FaCaretUp } from "react-icons/fa";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
// import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";

// export default function Category({ inputClicked,isLangArab, setInputClicked }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("Category");
//   const [categoryClasas, setcategoryClasas] = useState([])
//   const {contextMapView} = useAuth();

//   const handleCategorySelect = (categoryName) => {
//     alert(categoryName)
//     contextMapView.map.layers.items.forEach(function(layer){
//       layer.definitionExpression = `Class = '${categoryName}'`
//     })    
//     //setSelectedCategory(categoryName);
//     //setIsOpen(false);
//   };

//   useEffect(()=>{
//     const loadCatrgoryClasses = async() =>{
//       const featureLayer = new FeatureLayer({
//         url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/IslandNamingProject_v2/FeatureServer/0",
//         outFields: ["*"]
//       });
  
//       try {
//           const query = featureLayer.createQuery();
//           query.where = "1=1";
//           query.returnGeometry = true;
//           query.outFields = ["*"];
//           const results = await featureLayer.queryFeatures(query);
//           const features = results.features;
//           const categorySearch = [...new Set(features.map(feature => feature.attributes.Class))];
//           const classNameList = categorySearch.map(category => category); // Create array directly
//           setcategoryClasas(classNameList);
  
//       } catch (error) {
//           console.error("Error querying feature layer:", error);
//       }    
//     }
//     loadCatrgoryClasses();
    
//   },[categoryClasas])

//   return (
//     <div
//       onClick={() => setInputClicked(false)}
//       className="absolute bottom-1 right-1.5 z-[2]"
//     >
//       <Popover open={isOpen} onOpenChange={setIsOpen}>
//         <PopoverTrigger>
//           <Button
//             variant={"ghost"}
//             className={`rounded-full mobile_s:px-2 laptop_m:px-4 py-2 sm:h-6 h-7 bg-white bg-opacity-50 ${
//               inputClicked ? "text-black" : "text-white"
//             }`}
//           >
//             {(selectedCategory === "Category") ?(isLangArab?"الفئة":selectedCategory):selectedCategory}
//             {isOpen ? (
//               <FaCaretUp className="ml-2" />
//             ) : (
//               <FaCaretDown className="ml-2" />
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-32 h-52 overflow-y-scroll categories-scroll">
//           <div>
//             {categoryClasas.map((category) => (
//               <div
//                 key={category.name}
//                 className="text-sm py-2 cursor-pointer hover:bg-gray-100"
//                 onChange={() => handleCategorySelect(category)}
//               >
//                 {category}
//               </div>
//             ))}
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// const categories = [
//   { name: "Tawi" },
//   { name: "Island" },
//   { name: "Maskar" },
//   { name: "Bad" },
//   { name: "Ghail" },
//   { name: "Burga" },
//   { name: "Niqa" },
//   { name: "Seh" },
// ];
