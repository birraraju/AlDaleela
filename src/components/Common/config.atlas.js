const config = {
    featureServices: [
      { name: "Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/91" },
      { name: "Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/119" },
      { name: "Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/93" },
    ],    
    Print: {
      printServiceUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_daleela_Print/GPServer/Export%20Web%20Map",
      allowedFormats: ["Portable Document Format (PDF)"],
      allowedLayouts: ["POI_PRINT"]
    },
    Export: {
      printServiceUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Print_Layout_Aldaleela/GPServer/Export%20Web%20Map",
      allowedFormats: ["32-bit Portable Network Graphics (PNG32)", "Joint Photographic Experts Group (JPG)"],
      allowedLayouts: ["Map"]
    },
    // layerListServices: [
    //   { name: "Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/91", visible:true },
    //   { name: "Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/119", visible:true },
    //   { name: "Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/93", visible:true },
    //   { name: "Protected", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/90", visible:false },
    //   { name: "Pearl", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/89", visible:false },
    // ],
    layerListServices: {
      english: [
        {
          parent: {name:"Scale based Labelling",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/95", visible: true},
          children: [
            { name: "Island", id:"Scale_based_English_Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/91", visible: true },
            { name: "Marine", id:"Scale_based_English_Marine",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/119", visible: true },
            { name: "Terrestrial", id:"Scale_based_English_Terrestrial",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/93", visible: true },
            { name: "Protected", id:"Scale_based_English_Protected",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/90", visible: false },
            { name: "Pearl", id:"Scale_based_English_Pearl",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/89", visible: false }
          ]
        },
        {
          parent: {name:"Clustering",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/108", visible: false},
          children: [
            { name: "Island", id:"Clustering_English_Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/111", visible: true },
            { name: "Marine", id:"Clustering_English_Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/110", visible: true },
            { name: "Terrestrial", id:"Clustering_English_Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/109", visible: true },
            { name: "Protected", id:"Clustering_English_Protected", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/116", visible: false },
            { name: "Pearl", id:"Clustering_English_Pearl", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/115", visible: false }
          ]
        }
      ],
      arabic: [
        {
          parent: {name:"التسمية حسب المقياس",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/103", visible: true},
          children: [
            { name: "جزيرة", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/102", visible: true },
            { name: "بحري", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/101", visible: true },
            { name: "بري", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/100", visible: true },
            { name: "محمي", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/96", visible: false },
            { name: "لؤلؤة", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/97", visible: false }
          ]
        },
        {
          parent: {name:"التكتل",url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/104", visible: false},
          children: [
            { name: "جزيرة", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/2", visible: true },
            { name: "بحري", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/105", visible: true },
            { name: "بري", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/3", visible: true },
            { name: "محمي", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/107", visible: false },
            { name: "لؤلؤة", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer/106", visible: false }
          ]
        }
      ]
    },
    //   // Arabic Layers
    //   { 
    //     name: "Island_Arabic", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/91", 
    //     visible: true 
    //   },
    //   { 
    //     name: "Marine_Arabic", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/119", 
    //     visible: true 
    //   },
    //   { 
    //     name: "Terrestrial_Arabic", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/93", 
    //     visible: true 
    //   },
    //   { 
    //     name: "Protected_Arabic", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/90", 
    //     visible: false 
    //   },
    //   { 
    //     name: "Pearl_Arabic", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/89", 
    //     visible: false 
    //   },
  
    //   // English Layers
    //   { 
    //     name: "Island_English", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/91", 
    //     visible: false 
    //   },
    //   { 
    //     name: "Marine_English", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/119", 
    //     visible: false 
    //   },
    //   { 
    //     name: "Terrestrial_English", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/FeatureServer/93", 
    //     visible: false 
    //   },
    //   { 
    //     name: "Protected_English", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/90", 
    //     visible: false 
    //   },
    //   { 
    //     name: "Pearl_English", 
    //     url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/89", 
    //     visible: false 
    //   }
    // ],
    basemaps: [
      {
        title: "Arabic Dark Gray Geographic",
        id: "Basemap Arabic Dark Gray Geographic coordinates",
        thumbnailImg: "./images/Basemap Arabic Dark Gray Geographic coordinates.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_GCS/MapServer"
        ]
      },
      {
        title: "Arabic Dark Gray Web Mercator",
        id: "Basemap Arabic Dark Gray Web Mercator coordinates",
        thumbnailImg: "./images/Arabic Dark Gray Web Mercator .png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_WM/MapServer"
        ]
      },
      {
        title: "Arabic light Gray Geographic",
        id: "Basemap Arabic light Gray Geographic coordinates",
        thumbnailImg: "./images/Arabic light Gray Geographic.jpg",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_GCS/MapServer"
        ]
      },
      {
        title: "Arabic light Gray Web Mercator",
        id: "Basemap Arabic light Gray Web Mercator coordinates",
        thumbnailImg: "./images/Arabic light Gray Web Mercator.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_WM/MapServer"
        ]
      },
      // {
      //   title: "English Dark Gray Geographic",
      //   id: "Basemap English Dark Gray Geographic coordinates",
      //   thumbnailImg: "./images/English Dark Gray Geographic.png",
      //   baseLayers: [
      //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_GCS/MapServer"
      //   ]
      // },
      // {
      //   title: "English Dark Gray Web Mercator",
      //   id: "Basemap English Dark Gray Web Mercator coordinates",
      //   thumbnailImg: "./images/English Dark Gray Web Mercator.png",
      //   baseLayers: [
      //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_WM/MapServer"
      //   ]
      // },
      // {
      //   title: "English light Gray Geographic",
      //   id: "Basemap English light Gray Geographic coordinates",
      //   thumbnailImg: "./images/English light Gray Geographic.png",
      //   baseLayers: [
      //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_GCS/MapServer"
      //   ]
      // },
      // {
      //   title: "English light Gray Web Mercator",
      //   id: "Basemap English light Gray Web Mercator coordinates",
      //   thumbnailImg: "./images/English Light Gray Web Mercator.png",
      //   baseLayers: [
      //     "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_WM/MapServer"
      //   ]
      // },
      {
        title: "Satellite imagery",
        id: "Satellite imagery",
        thumbnailImg: "./images/ESRI World Imagery.png",
        baseLayers: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        ]
      },
    ],
    PortalUrl: "https://maps.smartgeoapps.com/portal",
    ItemWebMapID: "ac2003df385e4c1ead7d2243e3909c26",
    ItemWebMapIDEng: "6fddac3ec20e44f2874532b3fad771e0",
    BaseUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_Daleela_Features/MapServer"
  };
  
  export default config;
  