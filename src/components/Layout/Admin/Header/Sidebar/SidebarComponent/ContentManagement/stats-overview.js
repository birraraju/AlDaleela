import { useTheme } from "../../../../../ThemeContext/ThemeContext";

export default function StatsOverview({ totalRecords, approved, pending, rejected }) {
  const { isDarkMode, isLangArab } = useTheme();

  return (
    <div className="w-full pb-5">
      <h2
        className={`text-[20px] ${
          isDarkMode ? "text-[#FFFFFFCC]" : "text-[#464646]"
        } font-500 mb-6`}
      >
       { isLangArab?"نظرة عامة":"Overview"}
      </h2>
      <div className="flex  justify-between gap-2 lg:gap-12">
        <div className="flex-1 min-w-[120px] lg:min-w-[180px] xl:min-w-[200px] border py-3 grid rounded-lg justify-center items-center border-[#D9D9D966] space-y-0.5">
          <p
            className={`text-sm ${
              isDarkMode ? "text-white" : "text-[#000000]"
            } flex font-500 justify-center items-center text-muted-foreground`}
          >
            { isLangArab?"مجموع السجلات":"Total Records"}
          </p>
          <p className={`text-3xl ${isDarkMode? "text-white":"text-black"} flex justify-center items-center font-700`}>
          {totalRecords}
          </p>
        </div>
        <div className="flex-1 min-w-[120px] lg:min-w-[180px] xl:min-w-[200px] py-3 grid rounded-lg justify-center items-center border border-[#D9D9D966] space-y-0.5">
          <p
            className={`text-sm ${
              isDarkMode ? "text-white" : "text-[#000000]"
            } flex font-500 justify-center items-center text-muted-foreground`}
          >
            { isLangArab?"معتمد":"Approved"}
          </p>
          <p className="text-3xl flex justify-center items-center font-700 text-green-500">
          {approved}
          </p>
        </div>
        <div className="flex-1 min-w-[120px] lg:min-w-[180px] xl:min-w-[200px] py-3 border rounded-lg grid justify-center items-center border-[#D9D9D966] space-y-0.5">
          <p
            className={`text-sm ${
              isDarkMode ? "text-white" : "text-[#000000]"
            } flex font-500 justify-center items-center text-muted-foreground`}
          >
            { isLangArab?"قيد الانتظار":"Pending"}
          </p>
          <p className="text-3xl flex justify-center items-center font-700 text-orange-500">
          {pending}
          </p>
        </div>
        <div className="flex-1 min-w-[120px] lg:min-w-[180px] xl:min-w-[200px] py-3 border rounded-lg border-[#D9D9D966] grid justify-center items-center space-y-0.5">
          <p
            className={`text-sm ${
              isDarkMode ? "text-white" : "text-[#000000]"
            } flex font-500 justify-center items-center text-muted-foreground`}
          >
            { isLangArab?"مرفوض":"Rejected"}
          </p>
          <p className="text-3xl flex justify-center items-center font-700 text-red-500">
          {rejected}
          </p>
        </div>
      </div>
    </div>
  );
}
