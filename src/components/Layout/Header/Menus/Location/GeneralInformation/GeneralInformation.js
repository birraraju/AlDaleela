import React, { useEffect, useRef } from "react";
import { X } from "lucide-react"; // Import the close icon
import "../../../../../../App.css"; // Import your CSS file
import { useTheme } from "../../../../ThemeContext/ThemeContext"; // Import useTheme

export default function GeneralInformation({ onClose }) {
  const modalRef = useRef(null); // Create a ref for the modal
  const { isDarkMode, isLangArab } = useTheme(); // Access isDarkMode and isLangArab from context

  // Function to handle clicks outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Add event listener for clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, []);

  // Function to convert numbers to Arabic-Indic numerals
  const convertToArabicNumerals = (num) => {
    const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return String(num)
      .split("")
      .map((digit) => arabicNumerals[digit])
      .join("");
  };

  return (
    <div className="fixed inset-10 sm:inset-5 laptop_s:inset-10 z-50 flex items-center justify-center ">
      <div className="fixed inset-10 z-50 " onClick={onClose}></div> {/* Overlay to close on click */}
      <div
        ref={modalRef} // Attach the ref to the modal
        className={`p-4 rounded-lg shadow-lg relative z-50 w-[800px] mb-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.9)] text-white border-white" // Dark mode styles
            : "bg-white bg-opacity-98 text-black border-white" // Light mode styles
        }`}
      >
        {/* Heading & close button */}
        <div>
  <h1
    className={`text-[16px]   font-500 ${
      isLangArab ? "text-right" : "text-left"
    }`}
  >
    {isLangArab ? "معلومات عامة" : "General Information"}
  </h1>
  <button
    className={`absolute top-4 ${isLangArab ? "left-4" : "right-4"}  ${
      isDarkMode ? "text-gray-400" : "text-gray-600"
    }`}
    onClick={onClose}
  >
    <X className={`h-6 ${isDarkMode && " backdrop-invert-0 text-white"} w-6`} />
  </button>
</div>


        {/* Divider */}
        <div
          className={`my-2 h-[1px] w-full transition-colors duration-300 ${
            isDarkMode ? "bg-white bg-opacity-20" : "bg-black bg-opacity-10"
          }`}
        ></div>

        {/* Scrollable table with visible scrollbar */}
        <div className="scroll-container mr-1 h-[25rem] overflow-y-scroll">
          <table className="w-full mt-2 text-[14px]">
            <thead>
              <tr>
                {isLangArab ? (
                  <>
                    <th
                      className={`px-4 py-2 text-left font-medium text-[14px] ${
                        isDarkMode ? "text-gray-200" : "text-[#667085]"
                      }`}
                    >
                      الوصف
                    </th>
                    <th
                      className={`px-4 py-2 text-left font-medium text-[14px] ${
                        isDarkMode ? "text-gray-200" : "text-[#667085]"
                      }`}
                    >
                      التصنيف
                    </th>
                    <th
                      className={`px-4 py-2 text-left font-medium text-[14px] ${
                        isDarkMode ? "text-gray-200" : "text-[#667085]"
                      }`}
                    >
                      رقم التسلسل
                    </th>
                  </>
                ) : (
                  <>
                    <th
                      className={`px-4 py-2 text-left font-medium text-[14px] ${
                        isDarkMode ? "text-gray-200" : "text-[#667085]"
                      }`}
                    >
                      S.No
                    </th>
                    <th
                      className={`px-4 py-2 text-left font-medium text-[14px] ${
                        isDarkMode ? "text-gray-200" : "text-[#667085]"
                      }`}
                    >
                      Class
                    </th>
                    <th
                      className={`px-4 py-2 text-left font-medium text-[14px] ${
                        isDarkMode ? "text-gray-200" : "text-[#667085]"
                      }`}
                    >
                      Description
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {(isLangArab ? tableArabicsData : tableData).map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? isDarkMode
                        ? "bg-[#D5E5DE] bg-opacity-30"
                        : "bg-[#D5E5DE] bg-opacity-30"
                      : ""
                  }
                >
                  {isLangArab ? (
                    <>
                      <td
                        className={`px-4 py-2   font-medium text-[14px] ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {row.description}
                      </td>
                      <td
                        className={`px-4 py-2   font-medium text-[14px] ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {row.class}
                      </td>
                      <td
                        className={`px-4 py-2   font-medium text-[14px] ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {convertToArabicNumerals(index + 1)}
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        className={`px-4 py-2   font-medium text-[14px] ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {index + 1}
                      </td>
                      <td
                        className={`px-4 py-2   font-medium text-[14px] ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {row.class}
                      </td>
                      <td
                        className={`px-4 py-2   font-medium text-[14px] ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {row.description}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



// Define table data
const tableData = [
  { class: "Bohouth", description: "Searching means making an effort to reach something. He searches in the ground, meaning he digs a shallow hole. Searches are often in sandy ground, and the depth of the hole does not exceed the height of a man. Searches are not permanent (seasonal), and are dug after the rains and when water is needed." },
  { class: "Bad", description: "Bid’a is something that he created or invented. Bid’a means digging it, and its plural is bid’u’. It means a new water well that is created (digged) in a place where there was no water well before. It is known who invented it, i.e. who (digged) it." },
  { class: "Badira", description: "Plural: Badair, which is a form of high-altitude sand dune formation, which is higher than the surrounding sand dunes." },
  { class: "Burqa", description: "It is a natural formation mixed with stone, sand and clay, and the lightning is prominent from the ground and its surroundings." },
  { class: "Burka", description: "It is a low hole in the ground in the form of a basin, lined on the inside with stones or plaster, and used to collect and hold rainwater for a period of time. And its collection is (pools)." },
  { class: "Batha", description: "The plural is Batayeh, which is a flat and wide land in which the flood spreads, leaving behind coarse sand and gravel, and it extends for long distances." },
  { class: "Batin / Bateen", description: "The ventricle is what is hidden from something. It is said that the ventricle is the side hidden from the prevailing wind direction and which affects the back of the ventricle. It is the side opposite the ventricle. Its diminutive is (butin)." },
  { class: "Balqa'", description: "It means a barren land devoid of anything, and it is flat with sand mixed with gravel. The plural is (balaq’a)." },
  { class: "bandar", description: "A natural anchorage or dock where ships anchor in times of need, winds, and storms. It is found widely along the coasts." },
  { class: "Buwaym", description: "Plural: (Boimat), which is a mass of coral sea rocks protruding from the surface. It is located close to the coast or islands and its area does not exceed several square meters. Boim is smaller than Qasar." },
  { class: "Al tharb", description: "Sand dune, large and prominent, branched at the ends, star-shaped, surrounded by salt marshes or floods." },
  { class: "Thanyat", description: "A bend and curvature in the sea coast, it is smaller and shorter than Doha; its length does not exceed two kilometers." },
  { class: "Jabal", description: "What rises from the surface of the earth and extends and exceeds the hill in height." },
  { class: "Island", description: "An area of land surrounded by water on all sides, but not large enough to be considered a continent." },
  { class: "Jurf", description: "A natural formation eroded or carved out of the ground by the sea or flood, with a sharp edge." },
  { class: "Jerry", description: "The solid ground where no trace appears." },
  { class: "Jeja'a", description: "A group of trees close together, almost stuck together, used as a sign to mark the crossing of the sand chain." },
  { class: "Jufrah", description: "It is pronounced in the local dialect (Yafrah), and means a round hole, and what is meant here is the low, round land around it." },
  { class: "Halat", description: "Marine term for a small part of land that appears above sea level at low tide and disappears at high tide, so that it is submerged by sea water and not visible to sailors." },
  { class: "Habl", description: "It is a series of sand dunes connected to each other and extending longitudinally, and the land on both sides is low and extends like a rope." },
  { class: "Had", description: "Marine term from the local dialect that refers to the sand formed on the seabed that accumulates and arises from tides and ocean currents, and appears at the lowest low tide, and is one of the obstacles to maritime navigation." },
  { class: "Hidbat", description: "It is defined as a humpbacked sandy hill, that is, it is gradually curved upwards, making it easy to climb and cross. Plants and trees often grow on the hump." },
  { class: "Hazm", description: "It consists of several huge, high, and interconnected sand dunes that look like one high sand dune." },
  { class: "Oil field", description: "Oil extraction site." },
  { class: "Hiqna", description: "A deep depression between high sand dunes that has been likened to a human syringe located between the collarbones of the throat." },
  { class: "Hilhil", description: "Rocks moved from their original position due to natural factors, and when they gather and settle at the bottom of the valley, they are called (Ghashab)." },
  { class: "Hamrur", description: "Sand dunes covered with a layer of crystalline sand grains (red colour), blown by the wind, forming a red scarf." },
  { class: "Hanyah", description: "Natural bend at the ends of a valley border, or an arch, or in the natural formation of a mountain or stream under the influence of natural factors." },
  { class: "Hawiyya", description: "A depression surrounded on three sides by a dune with crops, or a pond built by Bedouins from rock, or a hole in the ground filled with rainwater." },
  { class: "Khabba", description: "A depression or plain in the mountains that has no obstacles to walking on. It may be in the desert in the form of a depression between two sand dunes, and it may have plants or trees. The diminutive form of (Khaba)." },
  { class: "Kharijat", description: "They are shallow water wells that are dug during the rainy season or shortly after. Their water is salty." },
  { class: "Kharimat", description: "It means the wide, low-lying land between the high sand dunes, and it is relatively wider and wider than a marsh." },
  { class: "Khatm", description: "The end or front of the mountain that is hit by the torrent or the end of the mountain, and its terrain appears in the shape of a human nose." },
  { class: "Khor", description: "A tongue of natural sea water extending into the land. In the desert, it is used as a description of a salty well, and is called a well of seawater." },
  { class: "Khourat", description: "An area of the sea near the coast that is deeper than the surrounding area." },
  { class: "Da'bat", description: "The sea water course in the shallow areas of the coasts where the sea current is strong and ships cannot settle in it." },
  { class: "Dahrah", description: "A broad, sloping side of a mountain, on which rainwater falling on the top of the mountain flows down to the foothills, in the dialects of the mountain region." },
  { class: "Dathur", description: "Roughly circular sandy desert hill of medium height, perhaps the hill most frequently trodden by people." },
  { class: "Da'anah", description: "It is used to refer to the ground in general, and in the dialect it is said 'Sak Al-Da’na' which means sit on the ground and be quiet." },
  { class: "Dimya", description: "A small sandy hill about three metres above the ground, free of stones and with no trees growing on it." },
  { class: "Dihyma", description: "It is defined as the land whose soil color is mixed with black, and its diminutive form is (Dahmaa)." },
  { class: "Dawhat", description: "It is a sea bay larger than a bend and is approximately semicircular in shape and located on the sea coast." },
  { class: "Deira", description: "Land in the high mountains that is suitable for agriculture, and it has a group of wa’oob (plural of wa’ab), meaning the place where there is cultivation and habitation." },
  { class: "Deema", description: "A group of lush, watered trees, as the term indicates fertile days (i.e. seasons of heavy rain)." },
  { class: "Ras", description: "A protrusion of land on the seashore that extends into the water." },
  { class: "Rabbadat", description: "Its plural is rabād, a soft sandy land that is abundant between sand dunes. Its sand is known for its extreme softness. The feet of animals sink into it and they crouch, meaning that it is difficult for them to move and cross it." },
  { class: "Rizm", description: "A sand dune that is higher than the surrounding ones, as in Razam (Bidaa Amer)." },
  { class: "Reelah", description: "It means a small plateau higher than a mountain with a slight slope, and it may be used for agriculture, such as Al-Waw’ab. The word is known in the dialect of the Arab Shuhuh tribes." },
  { class: "Rig", description: "Marine term for shallow waters close to the shore, or isolated in the sea and surrounded by deep waters." },
  { class: "Riq'a", description: "A flat piece of land, mixed with sand, clay and gravel, in the middle of a sandy area. It is smaller than (Saih), and the plural is Raqa’a and Raqa’at. Trees grow in it and it turns green in the spring after the rainy season." },
  { class: "Rekbah", description: "A small mountain between two larger mountains, as if it were a knee joint between them in the dialects of mountain people." },
  { class: "Al Rakkyah", description: "It is a well with a wide mouth and shallow depth, ranging from four to five fathoms, and is used for agriculture and irrigation, and its collection is rakaya." },
  { class: "Ramla", description: "It is a group of sand dunes that are difficult to cross and collect: sand and sand." },
  { class: "Zubara", description: "High ground visible to the eye, topped by stones placed on it naturally or by man, and most often Zubarah is close to the coast." },
  { class: "Zor", description: "An island or sandy peninsula near the coast that is not submerged by the sea, and is rich in marine plants and trees. It is similar to the camel’s foreleg, which is known in the terminology of camel people as the front of the camel’s chest, which is higher than its extremities." },
  { class: "Sahib", description: "Flat sand in rough terrain, longer and narrower than a sarooq." },
  { class: "Saruq", description: "A flat sandy land between sand dunes that extend parallel to the extension of those dunes, 'stealing' the view by virtue of its length." },
  { class: "Sabkha", description: "It is a low, sandy, flat area with saline soil where rainwater collects or a sea overflows, and the salty water evaporates, leaving salt on its surface. There is no vegetation in it due to its extreme salinity. The plural is sabkhas." },
  { class: "Satwa", description: "The area between high tide and maximum tide (occurring every few years), only near shallow water, is a wide, flat area that may be up to a kilometer wide." },
  { class: "Salaheb", description: "Tall hill between Zubarah and Al Qarn. In the language, Al Salhab means tall in general, and it was said that it is a tall man or horse." },
  { class: "seleel", description: "A watercourse in a valley. The stream or (Saleel) may be wet or dry." },
  { class: "Seheb", description: "A common term among mountain people, the plural of which is (Sohoob), which refers to flat, easy land and desert." },
  { class: "Seh", description: "The flat land in which valleys or torrents run, starting from the borders of high mountains to the low plains and coasts." },
  { class: "Sharaf", description: "A sandy hill overlooking adjacent lower areas, usually topped by ghaf trees." },
  { class: "Sharea'a", description: "The basin in which the water of the falaj, which is a fresh water channel that is permanent throughout the year, is collected. It is dug on the surface or underground in a streamlined manner that ensures the flow of water from its source to the cultivated areas. Before the water reaches the agricultural areas, it is collected in the basin (Sharia)." },
  { class: "Shu'ba", description: "A branch of a valley in which rainwater and floods flow. The Sho'ba, plural: She'ab or Sha'oob. In the language, it is a gap between two mountains. It is known locally as watercourses, i.e. small valleys descending from the tops of the mountains to the main valley extending between the mountains adjacent to these mountains." },
  { class: "Shalhah", description: "Marine term referring to a shallow area of the sea consisting of dry mud with hardened crusts. The shalha is abundant in sea creeks adjacent to the coasts, and is also found among sea reed trees." },
  { class: "Shamtut", description: "A medium-sized, tall and extended sand dune (shamatut). The plural of the word shamatut is (shamatit), which means in Arabic (tall), and the colour of the shamatut varies between light yellow and dark yellow." },
  { class: "Alshees", description: "Palm trees that grow in clusters and are not cared for and produce poor dates are called (Shees)." },
  { class: "Safwah", description: "Al-Safwa/Al-Safa in the dialect of the mountain people is a wide, smooth, hard stone, the small ones of which are used to grind grains. As for Al-Safa, for the people of Al-Taf and Al-Dhafra, it means a stone that holds water, whether it is on the ground or in the bottom of a well." },
  { class: "sulah", description: "Dry land, or land that has not had rain, or between two lands that have rain, because it is dry." },
  { class: "Sir", description: "A small fort built on inhabited islands. It may mean a fort, a small castle, or a small walled city. This term may also be applied to rocky heights on islands, usually on sea shores." },
  { class: "Tawi", description: "A water well that is lined from the inside with stones or branches so that it does not get buried or disappear." },
  { class: "Tawayya", description: "Water well dug in a valley is lined with stones from the inside so that it does not get buried or disappear." },
  { class: "Dhahrat", description: "A naturally flat and level area of land that gradually rises and is called a back because it is visible and conspicuous." },
  { class: "Al Edd", description: "A well whose water never runs dry. Plural: Addud." },
  { class: "Irq", description: "A series of medium-height, connected sand dunes that resemble the veins of a tree." },
  { class: "Arqoob", description: "It is a sand dune that is high above the ground. In the language, Argoob of the valley is a place with a severe bend and twist." },
  { class: "Aqebah", description: "The road and passage that is between two mountains and is difficult to cross, plural: Aqbaat." },
  { class: "Iqdah", description: "Group of ghaf or samr trees, growing close together in a place." },
  { class: "Iqlah", description: "They are water wells that are dug for a specific period of time, which may be hours or a day at most. The available water is taken from them and then filled in. Their depth does not exceed one fathom. At first, their water is fresh until it later becomes salty." },
  { class: "Oud", description: "A large, solitary ghaf tree with a long trunk devoid of branches, indicating its strong stability in the ground. The plural is a'wad. The oud or a'wad are important for guidance in the desert." },
  { class: "forest", description: "It is a group of planted trees." },
  { class: "Ghaf", description: "Ghafah is one of the famous environmental trees that grow in the desert and sandy areas. It was of great importance to people, as its wood was used, people sought shade under its shade, and their camels were fed with its leaves." },
  { class: "Ghadir", description: "Rainwater that has recently fallen and flowed in valleys collects in a low place on the ground and may remain for a long time. People go there to get their drinking water and to water their camels and livestock." },
  { class: "Ghalil", description: "It is a secondary stream of rainwater that flows into valley. It is also the areas where water flows on the surface of the earth. In marine side, it is known as the flow of sea water near the shallow coasts where the flowing waters meet due to the tides." },
  { class: "Ghet", description: "Low-lying land with water and planted with palm trees. Plural: (Ghiyut and Agwat)." },
  { class: "Ghayl/Ghaliya/Maghayel", description: "It is what remains of the flood water after it ends in the valley. As for the desert resident, the ghail is the well with abundant water. And (al-Maghliyyah) is a marsh with water and palm trees. The plural is (maghāyil)." },
  { class: "Ghena", description: "Dense trees without water in the mountains and in the plain." },
  { class: "Fasht", description: "Shallow water floor made up of fossilized coral reefs, from which building stones were cut in ancient times." },
  { class: "Falaj", description: "A channel dug underground or on the surface of the earth, which may be covered or exposed, and whose purpose is to collect groundwater or water from natural springs and wells." },
  { class: "Fay", description: "The root of the word is faj, then the jim was changed to ya. Faj is a wide, distant road, or a crack in the ground. The plural is fajaj, and fujjah is the gap between two mountains. The diminutive of faj is (fajaij)." },
  { class: "Qarrah", description: "They are large, round, independent rocks of volcanic origin, easily distinguishable from the rest of the mountain rocks." },
  { class: "Qaf", description: "Qaf is a marine terrain, which is the rocky bottom of shallow waters; it appears clearly when the sea tide occurs." },
  { class: "Qahha", description: "Maritime term referring to a pearl diving area close to the coast, with shallow waters of one to three fathoms, which are only dived by those who are unable to dive deeply, i.e. deep or deep." },
   { class: "Qara", description: "A long, low-rise natural rock formation in the form of a barrier and resembling a hillock. In the language, it means the middle of the back or the back of the hill." },
  { class: "Qurm", description: "A type of marine tree that grows abundantly in creeks and over large areas, and is very important for the reproduction of fish and birds." },
  { class: "Qurn", description: "A sandy hill topped by prominent rock masses. Plural: qurun. A qurun, for mountain people, is a prominent protrusion in a mountain or a small mountain." },
  { class: "Qarhoud", description: "It is larger than Al Qaf and Al Qarahood, a rocky hill overlooking the surrounding sites." },
  { class: "Qassar", description: "A rock mass composed of rocks and marine coral reefs protruding from the sea surface and located close to the coasts of the mainland or islands." },
  { class: "qit'a", description: "A marine term for a group of closely-knit, isolated coral reefs." },
  { class: "Qaidat", description: "Very large and massive sand dunes that seem to be sitting or kneeling on the ground without moving." },
  { class: "Quf", description: "What rose from the ground and its stones became solid; that is, the raised blocks that people used in construction after breaking them." },
  { class: "Alqellah", description: "A raised protrusion in the ground made of sand, and a large stone appears to the observer from a distance." },
  { class: "Qu'a", description: "It means the seabed. In the local dialect, it refers to the seabed when it is rocky, flat and wide. It is often added to a local name to identify the location and use it to identify it." },
  { class: "Kefaf", description: "The boundary between two lands of different natures, also known as the margins, i.e. (ends) or edges (of something)." },
  { class: "cave", description: "A place or cave carved into a mountain or rock by natural factors. It is often spacious and can be used as a shelter. For the people of Karbala, a cave is a large, sunken protrusion in the lightning with a shadow." },
  { class: "Water", description: "Wells in general and its diminutive form (muwaya) mean wells. The word (muwaya) is usually used to describe the scarcity of water in a particular well. The word (water) includes the following types of well terms, such as al-Tawi, al-Bid’a, al-Buhuth, and al-Uqla." },
  { class: "Mahdar", description: "(Muhadhar) is the place where people come, where the basics of life and stability are available, where they spend the summer and hot weather, and where there is water and palm trees. Muhadhar, in spatial terms, means the place where the residents’ dwellings (farjan) are located, and there may be more than one field around the Muhadhar." },
  { class: "Madara", description: "A nearly circular, flat piece of land between sand dunes, no more than a few hundred metres in diameter." },
  { class: "Maskar", description: "A natural part of the sea coast suitable for fishing by the 'skar' method, which means closing the exit outlet." },
  { class: "Misnad", description: "A large, sloping mountain (figuratively), or one that appears to the observer to be sloping like sloping land." },
  { class: "Msial/ Msila or Msil", description: "It is a place where rainwater flows and runs. It is a long cavity that cuts through the solid ground to allow water coming from mountain tops to flow into open lands." },
  { class: "Meshash", description: "An adjective for soft, moist soil." },
  { class: "Me'aradh", description: "A type of terrain such as (mountain or sand) that obstructs flat land and prevents the traveler from walking on it. Plural: (ma'aridh)." },
  { class: "Mafras", description: "A local maritime term meaning a sea passage that connects deep water (Khourah) with another that has shallow water between it, and can only be crossed through this opening or passage." },
  { class: "Mandar", description: "They are long stretches of sand, ranging in length from 4 to 40 kilometres, often bordered on their sides by high sand dunes, and formed in a form known locally as (veins), and there is no water resource in them." },
  { class: "Najd", description: "A hill made of clay or gravel (gravel) overlooking, commanding, and high above what is around it." },
  { class: "Palm", description: "It is a place where there are palm trees." },
  { class: "Nad", description: "It is a high, large, sandy, small rock formation, prominent and prominent from its surroundings." },
  { class: "Niqa", description: "A sand dune that is higher than its surroundings, and often overlooks low areas and sites adjacent to it, such as a marsh or a swamp, etc. The word (Niqian) is used as a plural for it in the local dialect, and in the classical language (Al-Naqqa) is a sand dune." },
  { class: "Niwa", description: "Marine term referring to the seabed and the place where oysters meet from which pearls are extracted. It is distinguished from others by its proximity to the sea surface, such that the 'niwa' is the raised part of the bottom." },
  { class: "Haza", description: "The shortest path between the sand dunes, easy for the walker to cross. In the language, Hazaa means (walking quickly), and it has been defined in the local dialect as the road and outlet that is between the sand dunes, such that the walker can take it without the trouble and difficulty of crossing the high sand dunes." },
  { class: "Hor", description: "A low, extended sandy area, usually in the middle or adjacent to sand dunes." },
  { class: "Hayer", description: "Marine term referring to the diving area where pearl oysters breed, i.e. the diving site where the diver dives and collects them (Hirat). In the past, diving ships used to sail to Hirat during the diving season, which lasted for months." },
  { class: "wadi", description: "Place where flood water and rainwater that falls on the tops of the mountain collect and drain. The flood (the running water in the valley) begins from the tops of the mountains, and the valley extends to the deserts, plains, and low sea coasts close to the mountains." },
  { class: "Wa'ab", description: "A land prepared and reclaimed for agriculture in mountainous areas and slopes, built in the form of rectangular terraces, with walls made of stones and clay to protect the soil from erosion during the rainy season. It is used for growing wheat and barley, and is irrigated from the valleys and aflaj nearby. Its plural is wa-‘awb." },
  { class: "Wijna", description: "What rises from the solid ground above what is around it, and is also pronounced (wajnah), and its plural is (waqan), and sometimes it is pronounced (wajnah), or the large marsh." },
  { class: "Wijna", description: "It is a natural rock formation on the sea coast, larger than a dam, higher and in the form of a bridge (Qantarah) that connects two ends of the land and crosses from one end to the other." },
  { class: "Yaw", description: "A low, wide area or patch of land surrounded by sand dunes. Plural: (yuwan)." }
];

const tableArabicsData = [
  {
    class: "بحوث",
    description:
      "البَحْثٌ أي بذل الجهد للوصول إلى شيء، ويبحثٌ في الأرض أي يحفر حفرة سطحية، وغالبَا ما تكون البحوث في أرض رملية لا يزيد عمق الحفرة عن قامة الرجل، والبحوث غير دائمة (موسمية) تُحفّر بعد الأمطار وعند الحاجة للماء.",
  },
  {
    class: "بدع",
    description:
      "بدَعٌ الشيء أنشأه أو اخترعه، وبدع البئرأي حفرها وجمعها بُدوع، وهي تعني بئر ماء جديدة تُبْدَعٌ (تُحفرٌ) في موضع ما لم يسبق فيه وجود بئر ماء، معروف من ابتدعها أي من (حفرها).",
  },
  {
    class: "بديرة",
    description:
      "جمعها بداير، وهي شكل من أشكال تكوين الكثبان الرملية عالية الارتفاع، والتي تعلو بارتفاعها عن الكثبان الرملية المجاورة لها.",
  },
  {
    class: "برقا",
    description:
      "هي تكوين طبيعي مختلط من الحجر والرمل والطين، والبرقا تكون بارزة عن الأرض وما يحيط بها.",
  },
  {
    class: "بركة",
    description:
      "عبارة عن حفرة في الأرض منخفضة على هيئة حوض تُكسى مِن الداخل بالحجارة أو الجص، و تُستخدّم لجمع وحبس مياه الأمطار مدّة من الزمن. و جمعها (برك).",
  },
  {
    class: "بطحاء",
    description:
      "والجمع بطائح وهي أرض منبسطة ومتّسعة يمد فيها السيل تاركا فيها الرَملَ الخشن والحَصّى، وتمتدٌ لمسافات طويلة.",
  },
  {
    class: "بطن / بطين",
    description:
      "البطين ما خفي من الشيء، ويقال بطن العرقوب أي الناحية المستترة عن اتجاه الريح السائد والتي تصيب ظهر العرقوب، وهي الجهة المعاكسة للبطن، و تصغيرها (بُطين).",
  },
  {
    class: "بلقع",
    description:
      "تعني الأرض القفر الخالية من كل شيء، وتكون مستوية يختلط رملها بالحصى، وجمعها (بلاقع).",
  },
  {
    class: "بندر",
    description:
      "مرسى أو مربط للسفن طبيعي ترسو السفن فيه في أوقات الضرورة وهبوب الرياح والعواصف ويكثر وجوده على طول السواحل.",
  },
  {
    class: "بويم",
    description:
      "جمعها (بويمات)، وهو عبارة عن كتلة من صخور البحر المرجانية البارزة على السطح. وتكون على مقربة من الساحل أو الجزر ولا تتعدّى مساحتها عدة أمتارمربعة ،و البويم اصغر من القصار.",
  },
  {
    class: "الثرب",
    description:
      "كثيب الرمل، كبير وبارز، متفرع الأطراف، نجمي الشكل، تحيط به السباخ أو السيوح.",
  },
  {
    class: "ثنية",
    description:
      "انثناء وانحناء في ساحل البحر، وهي أصغر وأقصر من الدوحة؛ ولا يزيد طولها عن كيلو مترين.",
  },
  {
    class: "جبل",
    description:
      "ما علا من سطح الأَرض واستطال وجاوَزَ التَّلَّ ارتفاعًا.",
  },
  {
    class: "جزيرة",
    description:
      "منطقة من اليابسة محاطة بالمياه من جميع الجهات، ولا ترقى مساحتها لتكون قارة.",
  },
  {
    class: "جرف",
    description:
      "تكوين طبيعي متآكل أو محفور من الأرض بفعل البحر أو السيل، ذو حافّة حادّة.",
  },
  {
    class: "جري",
    description:
      "الجري بكسر الجيم هي الأرض الصلبة التي لا يظهر فيها الأثر.",
  },
  {
    class: "جزعة",
    description:
      "مجموعة من الأشجار متقاربة تكاد تكون ملتصقة يستدلٌ بها كعلامة لقطع سلسلة الرمال.",
  },
  {
    class: "جفرة",
    description:
      "تنطق في اللهجة المحلية (ِيَفْرَة)، وتعني الحُفْرَة الْمُسْتَدِيرَةَ، والمقصود بها هنا الأرض المنخفضة المستديرة عمًا حولها.",
  },
  {
    class: "حالة",
    description:
      "مصطلح بحري يُطلّق على جزء صغير من الأرض يظهر فوق مستوى سطح البحر عند حدوث الجزر وتختفي في المدّ بحيث تغمرها مياه البحر ولا تظهر للبحارة.",
  },
  {
    class: "حبل",
    description:
      "عبارة عن سلسلة من الكثبان الرملية المتصلة ببعضها البعض وممتدة بشكل طولي، وتكون الأرض على جنبيها منخفضة وممتدة كالحَبْلٍ.",
  },
  {
    class: "حد",
    description:
      "مصطلح بحري من اللهجة المحلية يراد به الرمال المتكونة في قاع البحر والتي تتراكم وتنشأ من المد والجزر والتيارات البحرية، وتظهر عند أدنى انخفاض للجزر، وتكون أحد عوائق الملاحة البحرية.",
  },
  {
    class: "حدبة",
    description:
      "يُعرّف بأنّه مرتفع رملي أحدب الشكل، أي مقوّس إلى الأعلى بشكل تدريجي يسهل صعودها واجتيازها، وغالبًا ما تنمو على الحدبة النباتات والأشجار.",
  },
  {
    class: "حزم",
    description:
      "يتكون من عدة كثبان رملية ضخمة وعالية ومتلاصقة تبدو ككثيب رملي واحد مرتفع.",
  },
  {
    class: "حقل بترول",
    description:
      "موقع استخراج النفط.",
  },
  {
    class: "حقنة",
    description:
      "منخفض عميق بين الكثبان الرملية العالية شُبهَتَ بحاقنة الإنسان التي تقع بين الترقوتين من الحلق.",
  },
  {
    class: "حلحل",
    description:
      "الحجارة المتحركة عن موضعها الأصلي بفعل عوامل الطبيعة، وعندما تتجمع وتستقر أسفل الوادي يطلق عليها (الغشب).",
  },
  {
    class: "حمرور",
    description:
      "كثبان رملية مغطاة بطبقة من حبيبات الرمل البلوري (أحمر اللون)، تذروه الريح، ويشكّل ما يشبه الوشح الأحمر.",
  },
  {
    class: "حنية",
    description:
      "انعطاف طبيعي في طرفي حدّ الوادي، أو تقوس، أو في التكوين الطبيعي للجبل أو السيح بتأثير العوامل الطبيعية.",
  },
  {
    class: "حوية",
    description:
      "منخفض محاط من ثلاث جهات بنقا (كثيب) به زرع، أو بركة يبنيها البدوي من الصخر، أو حُفَرعلى أرض صُلبة يُجمع وبخزّن فيها مياه الأمطار عند سيلانها، ويُحاط عليها بالتراب والحجر.",
  },
  {
    class: "خبً",
    description:
      "منخفض أو سهل في الجبال لا توجد به عوائق للمسير، وقد يكون في الصحراء على هيئة منخفض بين كثبين من الرمل، ويكون به نباتات أو أشجار, و تصغير(خبى).",
  },
  {
    class: "خِريْجة",
    description:
      "هي آبار مياه غير عميقة تُحفّر في موسم الأمطار أو بعدها بقليل، ويصل عُمقها إلى قامتين و ماؤها مويلح.",
  },
  {
    class: "خريمة",
    description:
      "تعني الأرض المنخفضة الممتدة الواسعة بين الكثبان الرملية العالية، وهي أوسع وأعرض من (الهور) نسبيّا.",
  },
  {
    class: "خَطْمَة / خَطْم",
    description:
      "عبارة عن نهاية أو مقدّمة الجبل التي يضربها السيل أو نهاية الجبل، وتظهر تضاريسه على شكل أنف الإنسان.",
  },
  {
    class: "خور",
    description:
      "وهو لسان من ماء البحر الطبيعي ممتد داخل اليابسة، أمّا في الصحراء فإنّه يستخدم كصفة للبئر المالحة فيقال بئر خور.",
  },
  {
    class: "خورة",
    description:
      "منطقة في البحر بالقرب من الساحل تكون أعمق مما حولها.",
  },
  {
    class: "داعبة",
    description:
      "مجرى ماء البحر في المناطق الضحلة من السواحل يشتدٌ فيها التيار البحري ولا تستطيع السفن الاستقرار فيها.",
  },
  {
    class: "دحرة",
    description:
      "جانب من الجبل عريض مائل، ينحدر عليه ماء المطر الساقط على أعلى الجبل إلى السفح،في لهجات منطقة الإمارات، يقولون مثلا: انزلق الشخص من الدحرة.",
  },
  {
    class: "دسمة",
    description:
      "قطعة من اليابسة ناتئة عن الأرض لا يستطيع السيل اجتيازها، تميل إلى الاستدارة، ويقال تسميتها بسبب شكلها أو نوعية تربتها الخصبة التي تقاوم السيل.",
  },
  {
    class: "دف",
    description:
      "مجموعة من التلال الرملية المتراكمة، بعضها فوق بعض, تكون قريبة من بعضها، كل تل يظهر ويغطي الذي قبله.",
  },
  {
    class: "دلعة",
    description:
      "يقال دلع البئر أي أعاد بناء حافتها وغطاءها الداخلي من الحجارة والجص عند انهيارها بسبب كثرة الاستخدام.",
  },
  { class: "دِهيِمَةُ", description: "تجمع بركة المياه المندفعة من الجبال في مكان منخفض، ويكون سطحها سكونًا ولا تكاد تتحرّك المياه فيها، فهي مثل الصنبور الذي لا يفتح ولا يُغلق، ومنه يُسمى أحيانًا (قَلَبة) و(مخضّر) أي موطن العشب الأخضر." },
  { class: "دوحة", description: "الأرض التي نمت فيها العشب وتحولت بها التربة إلى اللون الأخضر في مواسم الأمطار." },
  { class: "ديرة", description: "تكتل الصخور العمودية فوق الأرض والتي لا تغطيها النباتات أو الأزهار." },
  { class: "دِيمَة", description: "الأرض التي تظهر فيها التصدعات بوضوح في طبقاتها وتتجه نحو سواحل البحر." },
  { class: "رأس", description: "الأرض التي تكون عادةً مُدبّرة أو مُقوّمة للنباتات المستدامة، كما تزرع فيه البذور." },
  { class: "ربًاضَة", description: "تطلق على الكثبان الرمليّة الطويلة الرفيعة، وتجري فيها مجاري المياه في فصل الأمطار." },
  { class: "رِزْم / رزمة", description: "مجموعة من الكثبان الصغيرة المتواصلة في شكل قوس." },
  { class: "رِعْلة", description: "الأرض المتعرّجة مرتفعة قليلاً، يتم تجميع فيها ماء الأمطار." },
  { class: "رق / رقة", description: "المصطلح الذي يُستخدم في الموانئ والمعانِ الأفقية و يعني الموانئ المائية المرتفعة." },
  { class: "رقعة", description: "صخور ملساء أو عُريضة تظهر في البحر أو بجواره، وتتواجد عادةً عند الشواطئ المنخفضة." },
  { class: "رِكبة", description: "مياه صافية تتجمع في أحواض تربية الأسماء وُتكون بمثابة عيون للماء." },
  { class: "الركيّة", description: "أرض واسعة وغنية تُنبت الصدّيق، ويكون نبتها متفرّقًا في أوقات مختلفة، ويعود أصل الاسم إلى المفرد 'صدّيق' وهو نبات ينبت في الأماكن الرطبة." },
  { class: "رَمْلّة", description: "تكتل الصخور العمودية فوق الأرض والتي لا تغطيها النباتات أو الأزهار." },
  { class: "زبَارة", description: "الأرض التي تظهر فيها التصدعات بوضوح في طبقاتها وتتجه نحو سواحل البحر." },
  { class: "زَوْر", description: "الجرس الدائر، وهو الجرس ذو الخواص الصوتية المثالية، وقد انتشر هذا الصوت في الأماكن السياحية خلال الاستجمام." },
  { class: "سَاحِب", description: "الأرض التي نمت فيها العشب وتحولت بها التربة إلى اللون الأخضر في مواسم الأمطار." },
  { class: "ساروق", description: "أرض مُدبّرة أو مُقوّمة للنباتات المستدامة، كما تزرع فيه البذور." },
  { class: "سبخة", description: "تطلق على الكثبان الرمليّة الطويلة الرفيعة، وتجري فيها مجاري المياه في فصل الأمطار." },
  { class: "سَطْوَة", description: "الجرس الدائر، وهو الجرس ذو الخواص الصوتية المثالية، وقد انتشر هذا الصوت في الأماكن السياحية خلال الاستجمام." },
  { class: "سلاهب", description: "مجموعة من الكثبان الصغيرة المتواصلة في شكل قوس." },
  { class: "سّلِيلٌ", description: "الأرض المتعرّجة مرتفعة قليلاً، يتم تجميع فيها ماء الأمطار." },
  { class: "والسل", description: "تجمع بركة المياه المندفعة من الجبال في مكان منخفض، ويكون سطحها سكونًا ولا تكاد تتحرّك المياه فيها." },
  { class: "سهب", description: "ممر مائي ضيق داخل الوادي يمتد بين كتلتين جبليتين على شكل زاوية." },
  { class: "سيْح", description: "الأرض التي تكون عادةً مُدبّرة أو مُقوّمة للنباتات المستدامة، كما تزرع فيه البذور." },
  { class: "شَرف", description: "مجموعة من الكثبان الصغيرة المتواصلة في شكل قوس." },
  { class: "شريعة", description: "أرض واسعة وغنية تُنبت الصدّيق، ويكون نبتها متفرّقًا في أوقات مختلفة." },
  { class: "شِعبة", description: "الجرس الدائر، وهو الجرس ذو الخواص الصوتية المثالية." },
  { class: "شَلْهَة", description: "تكتل الصخور العمودية فوق الأرض والتي لا تغطيها النباتات أو الأزهار." },
  { class: "شَمْطٌوط", description: "الجرس الدائر، وهو الجرس ذو الخواص الصوتية المثالية." },
  { class: "الشّيص", description: "الأرض التي نمت فيها العشب وتحولت بها التربة إلى اللون الأخضر." },
  { class: "صّفوة", description: "مياه صافية تتجمع في أحواض تربية الأسماء وُتكون بمثابة عيون للماء." },
  { class: "صٌلّة", description: "المصطلح الذي يُستخدم في الموانئ والمعانِ الأفقية." },
  { class: "صير", description: "أرض واسعة وغنية تُنبت الصدّيق، ويكون نبتها متفرّقًا في أوقات مختلفة." },
  { class: "طوي", description: "الأرض المتعرّجة مرتفعة قليلاً، يتم تجميع فيها ماء الأمطار." },
  { class: "طُويّة", description: "ممر مائي ضيق داخل الوادي يمتد بين كتلتين جبليتين." },
  { class: "ظَهَرَة", description: "الأرض التي تظهر فيها التصدعات بوضوح." },
  { class: "الِعد", description: "مجموعة من الكثبان الصغيرة المتواصلة في شكل قوس." },
  { class: "عرق", description: "أرض واسعة وغنية تُنبت الصدّيق." },
  { class: "عَرقوب", description: "الجرس الدائر، وهو الجرس ذو الخواص الصوتية المثالية." },
  { class: "عْقِبَة", description: "تكتل الصخور العمودية فوق الأرض والتي لا تغطيها النباتات." },
  { class: "عِقْدَة", description: "مياه صافية تتجمع في أحواض تربية الأسماء." },
  { class: "عِقْلَة", description: "مجموعة من الكثبان الصغيرة المتواصلة." },
  { class: "عود", description: "ممر مائي ضيق داخل الوادي يمتد بين كتلتين جبليتين." },
  { class: "غابة", description: "الأرض التي تكون عادةً مُدبّرة للنباتات المستدامة." },
  { class: "غافة", description: "الأرض المتعرّجة مرتفعة قليلاً." },
  { class: "غدير", description: "مياه صافية تتجمع في أحواض." },
  { class: "غَلِيل", description: "مجموعة من الكثبان الصغيرة المتواصلة." },
  { class: "غيط", description: "أرض واسعة وغنية تُنبت الصدّيق." },
  { class: "غِيل / مغلية / مغايل", description: "ممر مائي ضيق داخل الوادي." },
  { class: "غَيْنة", description: "الأرض التي تظهر فيها التصدعات بوضوح." },
  { class: "فَشْت", description: "تكتل الصخور العمودية فوق الأرض." },
  { class: "فلج", description: "الأرض التي نمت فيها العشب." },
  { class: "فَيٌ", description: "أرض واسعة وغنية تُنبت الصدّيق." },
  { class: "قَارَةُ", description: "الجرس الدائر ذو الخواص الصوتية." },
  { class: "قاف", description: "مجموعة من الكثبان الصغيرة المتواصلة." },
  { class: "قحة", description: "ممر مائي ضيق داخل الوادي." },
  { class: "قرا", description: "الأرض المتعرّجة مرتفعة قليلاً." },
  { class: "قرمة", description: "مياه صافية تتجمع في أحواض." },
  { class: "قِرْن", description: "مجموعة من الكثبان الصغيرة المتواصلة." },
  { class: "قَرْهُود", description: "الأرض التي نمت فيها العشب." },
  { class: "قصٌار", description: "تكتل الصخور العمودية فوق الأرض." },
  { class: "قطعة", description: "مصطلح بحري يُطلّق على مجموعة الشعب المرجانية المتلاصقة والمنعزلة." },
  { class: "قعِيْدَةُ وقعدّة", description: "كثبان رملية كبيرة جدًّا وضخمة كأنّها جالسة أو جاثية على الأرض دون حراك." },
  { class: "قف", description: "ما ارتفع من الأرض وصلبت حجارته؛ أي الكُتل المرتفعة والتي كان الناس يقومون باستعمالها في البناء بعد تكسيرها." },
  { class: "القلة", description: "بروز في الأرض على شكل مرتفع يتكوّن من الرمل، والحجر الكبير يظهر للمستدلٌ من مكان بعيد." },
  { class: "قُوع", description: "يُقصد به قاع البحر وفي اللهجة المحلية يُطُلّق على قاع البحر عندما يكون صخريا ومستويا ومتّسعَا وفي أغلب الأحيان يضاف إلى اسم محلي لتعريف الموقع واستخدامه للاستدلال عليه." },
  { class: "كفاف", description: "الحد الفاصل بين أرضين ذات طبيعتين مختلفتين ويُعرّف أيضًا بالحواشي، أي (نهايات) أو أطرافٌ (الشيء)." },
  { class: "كهف", description: "مكان أو مغارة منقورة في الجبل أو الصَخِر بفعل عوامل الطبيعة، تكون في أغلب الأحيان واسعة، ويمكن استخدامها كمأوى، وعند أهل الطف فإنّ الكهف هو البروز الكبير الغائر في البرقا ذو الظل." },
  { class: "ماء", description: "تعني الآبار على عمومها وتصغيره (مُوَيَة)، وتُستخدم كلمة (موية) عادةً لوصف قلة المياه في بئر معيّنة، وكلمة (ماء) تشمل الأنواع التالية من مصطلحات الآبار، كالطوي والبدع؛ والبحوث، والعقلة." },
  { class: "محَضر", description: "يُجمع (محاضر) وهو المكان الذي يحضر إليه الناس، وتتوفّر فيه أساسيات الحياة والاستقرار ويقضون فيه فترة الصيف والقيظ وبه ماء ونخيل، والمحضر بالصفة المكانية يعني مكان تواجد مساكن (فرجان) السكّان، وقد يكون حول المحضر أكثر من غيط." },
  { class: "مدَارَةِ", description: "قطعة من الأرض شبه مستديرة ومستوية بين الكثبان الرملية، لا يزيد قُطرها عن بضع مئات من الأمتار." },
  { class: "مسْكَر", description: "جزء طبيعي من ساحل البحر يصلح لاصطياد الأسماك فيه بطريقة 'السكار'، وتعني إغلاق منفذ الخروج." },
  { class: "مِسْناد", description: "نقا كبير مائل (مجازًا)، أو يُخَيّل للناظر أنَّه مائل كالأرض المائلة." },
  { class: "مسيال/ مسيلة / مسيل", description: "هو مَوْضِعٌ جريان وتدفق سَيْلٍ الأمطار وهو عبارة عن تجويف طويل يشقٌ الأرض الصلبة لتسييل فيه المياه القادمة من قِمَم الجبال إلى الأراضي المفتوحة." },
  { class: "مَشاش", description: "صفة للأرض اللينة الرطبة." },
  { class: "مِعراض", description: "نوع من أنواع تضاريس الأرض مثل (الجبل أو الرملة) يعترض الأرض المستوية، ويحد السائر من السير فيها والجمع (معاريض)." },
  { class: "مُفرَص", description: "مصطلح بحري محلي يعني ممرًا بحريًا يصل بين مياه عميقة (خورة) وأخرى يكون بينهما مياه ضحلة، ولا يمكن اجتيازه إلا من هذا المفرص أو الممر." },
  { class: "مندر", description: "عبارة عن سيوح تمتدٌ لمسافات بعيدة يتراوح طولها ما بين 4 و40 كيلومتر، وغالبا ما تحاذيها من جوانبها الكثبان الرملية العالية، وتتشكّل بشكلٍ ما يُعرّف محليًا ب (العروق)، ولا يوجد فيها أي مورد للمياه." },
  { class: "نَجد", description: "مرتقع مكوّن مِن الطين أو الحصى (حصوي) مطل ومشرف وعالٍ عمّن حوله." },
  { class: "نخل", description: "هو مكان يوجد فيه أشجار النخيل." },
  { class: "نَدّ", description: "هو مرتفع من الرمل والحجر الصغير ذو حجم عظيم وعالٍ وبارز عمًا حوله." },
  { class: "نِقا", description: "كثيب من الرمل مرتفع عمًا حوله، ويطلٌ في الغالب على مناطق ومواقع منخفضة ومتاخمة له، مثل الهَوْر أو خريمة وغيرها." },
  { class: "نَيْوَة", description: "مصطلح بحري يُطلّق على قاع البحر وموضع اجتماع المحار الذي يُستخرج منه اللؤلو، ويمتاز عن غيره بقربه من سطح البحر بحيث تكون (النيوة) هي الجزء المرتفع من القاع." },
  { class: "هزع", description: "أقصر الدروب بين الكثبان الرميلة، يسهل اجتيازه على السائر." },
  { class: "هَور", description: "منطقة رملية منخفضة وممتدّة وتكون عادةً في الوسط أو متاخمة للكثبان الرملية." },
  { class: "هَيْر", description: "مصطلح بحري يُطلّق على المغاص الذي يتكاثر فيه محار اللؤلؤ، أي موضع الغوص الذي يغوص فيه الغواص وجمعه (هيرات)." },
  { class: "وادي", description: "موضع تجمّع وجربان مياه السيول والأمطار الساقطة في أعالي الجبل." },
  { class: "وَعَبْ", description: "أرض تهِيأ وتستصلح للزراعة في المناطق والمنحدرات الجبلية، وتبنى على هيئة مصاطب مستطيلة." },
  { class: "وقْنّة / وجنة", description: "ما ارتفع من الأرض الصلبة عمًا حوله، وتُلفَظ أُيضاً (وجنة)، وجمعها (وقن)." },
  { class: "يسْرّة", description: "هي تشكيل صخري طبيعي على ساحل البحر، تكون أكبر من القصّار وأكثر ارتفاعّا." },
  { class: "يَوْ", description: "منطقة أو رقعة من الأرض منخفضة وواسعة عمًا حولها من الكثبان الرملية." }
];
