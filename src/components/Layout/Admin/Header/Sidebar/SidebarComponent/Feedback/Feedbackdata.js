// FeedbackData.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../../components/ui/card";
import Badge from "../../../../../../../components/Layout/Admin/Header/Sidebar/SidebarComponent/Feedback/Badge";
import { X } from "lucide-react";

const FeedbackData = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-normal">Feedback</CardTitle>
          <button 
            className="px-3 py-1 text-sm text-black  transition-colors" 
            onClick={onClose}
          >
            <X className="h-5 w-6" />
          </button>
        </CardHeader>
        <CardContent>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-wrap py-5 gap-6 md:gap-28">
            <div>
              <p className="text-sm font-medium text-gray-500">Sender Name</p>
              <p className="text-sm font-semibold">{user.username}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sender Email ID</p>
              <p className="text-sm font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Submission Date</p>
              <p className="text-sm font-semibold">
                {new Date(user.createdDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              {/* <Badge
                variant={user.status === "Read" ? "success" : "error"}
                className={`mt-1 font-semibold ${
                  user.status === "Read" ? "text-green-400" : "text-red-400"
                }`}
              >
                {user.status}
              </Badge> */}
              <Badge
                variant={"Read" === "Read" ? "success" : "error"}
                className={`mt-1 font-semibold ${
                  "Read" === "Read" ? "text-green-400" : "text-red-400"
                }`}
              >
                {"Read"}
              </Badge>
            </div>
          </div>
          <div className="mt-9">
            <p className="text-sm font-medium text-gray-500">Feedback</p>
            <p className="mt-1 text-sm font-bold">{user.feedbackinfo}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackData;
