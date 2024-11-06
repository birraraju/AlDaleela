import { useTheme } from "../../../Layout/ThemeContext/ThemeContext"; // Import the theme context

export default function AboutDescription() {
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode state

  return (
    <>
      <p className={`font-omnes text-[13px] font-medium m-0   laptop_s:mb-0 laptop_s:mt-1  ${isDarkMode ? 'text-[#FFFFFFCC] text-opacity-80' : 'text-[#505050]'} leading-5 mb-3`}>
      {isLangArab ? " حماية الموارد الطبيعية في أبوظبي من أجل مستقبل مستدام" : "Safeguarding Abu Dhabi's natural resources for a sustainable future."}
      </p>

      <div className="">
        {content.map((item, index) => (
          <p key={index} className={`bg-fontFamily-poppins-0 font-[400px] text-[12px] ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#505050]'} ${isLangArab?"laptop_m:leading-6":"laptop_m:leading-5"}   leading-4 `}>
            {isLangArab ? item.arabicDescription : item.description} {/* Display Arabic or English based on language state */}
            </p>
        ))}
      </div>
    </>
  );
}

const content = [
  {
    description:
      "EAD regulates and enforces Abu Dhabi's environmental laws to protect biodiversity and preserve the quality of life for a sustainable future.",
      arabicDescription:
       "تقوم هيئة البيئة - أبوظبي بتشريع وإنفاذ القوانين البيئية في أبوظبي لحماية التنوع البيولوجي والمحافظة على جودة الحياة من أجل مستقبل مستدام."
    },
  {
    description:
      "Starting as a small group of pioneering ecologists in 1996 working in the harsh desert environment, we have grown - breaking down barriers and pushing the limits of science and conservation.",
  arabicDescription:
       "انطلقت الهيئة في عام 1996 بمجموعة صغيرة من علماء البيئة الرائدين الذين كانوا يعملون في بيئة صحراوية قاسية، نمت الهيئة وتخطت التحديات وانطلقت نحو آفاق أوسع من الأبحاث العلمية والجهود المتواصلة للمحافظة على البيئة."
    },
  {
    description:
      "We are now the largest environmental regulator in the Middle East, continuing the strong legacy of the late Sheikh Zayed bin Sultan Al Nahyan by exemplifying his values of conservation.",
  arabicDescription:
       "نحن الآن أكبر سلطة بيئية مختصة في الشرق الأوسط، ونمثل امتداداً للإرث الغني للمغفور له المؤسس الشيخ زايد بن سلطان آل نهيان، من خلال تجسيد قيمه في المحافظة على البيئة."
    },
  {
    description:
      "Our proudest achievements include setting up the Sheikh Zayed Protected Areas Network, recording 100 unknown invertebrate species and leading the region in banning gargour fishing nets – while our mandate is focused on regulation and direction of policy with transparency.",
  arabicDescription:
       "من أبرز إنجازاتنا إنشاء شبكة زايد للمحميات الطبيعية ، وتسجيل 100 نوع من اللافقاريات لم تكن معروفة علمياً من قبل، وتحقيق الريادة الإقليمية بحظر استخدام شباك القرقور (أقفاص صيد الأسماك) ، فيما تتركز مهمتنا على تقديم المشورة وتوفير المعلومات بكل شفافية لوضع السياسات البيئية في الإمارة وتنفيذها."
    },
  {
    description:
      "But our work doesn't stop there. It's as much about the future as it is about the past.",
  arabicDescription:
       "لكن عملنا لا يتوقف عند هذا الحد. إنه عمل يتعلق بالمستقبل، بقدر ما هو مرتبط بالماضي."
    },
    
];





    /* {
      description:
      "Each year, we carry out thousands of compliance inspections and assess and characterise risks to develop a better understanding of environmental risks in the emirate.",
    arabicDescription:
    "في كل عام، نقوم بتنفيذ الآلاف من عمليات التفتيش لضمان الامتثال وتقييم المخاطر ووصفها لتعزيز المعرفة بالمخاطر البيئية في الإمارة."
      },
      {
        description:
        "The prosperity of Abu Dhabi has relied on our natural resources. The environment is our foundation and our history. Join us in making it our future.",
      arabicDescription:
      "لقد اعتمد ازدهار أبوظبي على مواردنا الطبيعية، فالبيئة هي أساسنا وتاريخنا. انضموا إلينا لنحقق مستقبل أكثر استدامة."
        }, */

