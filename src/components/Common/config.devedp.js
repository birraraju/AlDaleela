const config = {
  featureServices: [
    { name: "Island", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/91" },
    { name: "Marine", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/1" },
    { name: "Terrestrial", url: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/FeatureServer/93" },
  ],
  Print: {
    printServiceUrl: "https://devedp.ead.ae/server/rest/services/AlDaleela/AlDaleela_PrintTemplate/GPServer/Export%20Web%20Map",
    allowedFormats: ["Portable Document Format (PDF)"],
    allowedLayouts: ["Print"]
  },
  Export: {
    printServiceUrl: "https://devedp.ead.ae/server/rest/services/AlDaleela/AlDaleela_PrintTemplate/GPServer/Export%20Web%20Map",
    allowedFormats: ["32-bit Portable Network Graphics (PNG32)", "Joint Photographic Experts Group (JPG)"],
    allowedLayouts: ["Export"]
  },
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
  basemapsConfig: {
    Arabic: [
      {
        title: "خريطة أساس رمادية داكنة بالعربية - الإحداثيات الجغرافية",
        id: "Basemap Arabic Dark Gray Geographic coordinates",
        thumbnailImg: "./images/Basemap Arabic Dark Gray Geographic coordinates.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_GCS/MapServer"
        ]
      },
      {
        title: "خريطة أساس رمادية داكنة بالعربية - إحداثيات ويب ميركاتور",
        id: "Basemap Arabic Dark Gray Web Mercator coordinates",
        thumbnailImg: "./images/Arabic Dark Gray Web Mercator .png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_DarkGray_WM/MapServer"
        ]
      },
      {
        title: "خريطة أساس رمادية فاتحة بالعربية - الإحداثيات الجغرافية",
        id: "Basemap Arabic Light Gray Geographic coordinates",
        thumbnailImg: "./images/Arabic light Gray Geographic.jpg",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_GCS/MapServer"
        ]
      },
      {
        title: "خريطة أساس رمادية فاتحة بالعربية - إحداثيات ويب ميركاتور",
        id: "Basemap Arabic Light Gray Web Mercator coordinates",
        thumbnailImg: "./images/Arabic light Gray Web Mercator.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapAra_LightGray_WM/MapServer"
        ]
      },
      {
        title: "صور الأقمار الصناعية",
        id: "Satellite imagery Arabic",
        thumbnailImg: "./images/ESRI World Imagery.png",
        baseLayers: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        ]
      }
    ],
    English: [
      {
        title: "English Dark Gray Geographic",
        id: "Basemap English Dark Gray Geographic coordinates",
        thumbnailImg: "./images/English Dark Gray Geographic.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_GCS/MapServer"
        ]
      },
      {
        title: "English Dark Gray Web Mercator",
        id: "Basemap English Dark Gray Web Mercator coordinates",
        thumbnailImg: "./images/English Dark Gray Web Mercator.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_DarkGray_WM/MapServer"
        ]
      },
      {
        title: "English Light Gray Geographic",
        id: "Basemap English Light Gray Geographic coordinates",
        thumbnailImg: "./images/English light Gray Geographic.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_GCS/MapServer"
        ]
      },
      {
        title: "English Light Gray Web Mercator",
        id: "Basemap English Light Gray Web Mercator coordinates",
        thumbnailImg: "./images/English Light Gray Web Mercator.png",
        baseLayers: [
          "https://arcgis.sdi.abudhabi.ae/agshost/rest/services/Hosted/BaseMapEng_LightGray_WM/MapServer"
        ]
      },
      {
        title: "Satellite Imagery",
        id: "Satellite imagery English",
        thumbnailImg: "./images/ESRI World Imagery.png",
        baseLayers: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        ]
      }
    ]
  },
  PortalUrl: "https://devedp.ead.ae/portal",
  ItemWebMapID: "a4f3e0fc881e41c8bc9f14ceb880374f",
  ItemWebMapIDEng: "1e4b6216e5f0496f8f28f5f1b830bb67",
  BaseUrl: "https://devedp.ead.ae/server/rest/services/AlDaleela/Al_Daleela/MapServer"
};

export default config;
