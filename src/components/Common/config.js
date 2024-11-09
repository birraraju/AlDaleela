const config = {
    featureServices: [
      { name: "Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/91" },
      { name: "Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/1" },
      { name: "Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/93" },
    ],
    layerListServices: [
      { name: "Island", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/91", visible:true },
      { name: "Marine", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/1", visible:true },
      { name: "Terrestrial", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/93", visible:true },
      { name: "Protected", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/90", visible:false },
      { name: "Pearl", url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/FeatureServer/89", visible:false },
    ],
    PortalUrl: "https://maps.smartgeoapps.com/portal",
    ItemWebMapID: "ac2003df385e4c1ead7d2243e3909c26",
    BaseUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/layer2/MapServer"
  };
  
  export default config;
  