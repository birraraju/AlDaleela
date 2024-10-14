// FeedbackData.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../../components/ui/card";
import Badge from "../../../../../../../components/Layout/Admin/Header/Sidebar/SidebarComponent/Feedback/Badge";

const FeedbackData = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-normal">Feedback</CardTitle>
          <button 
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors" 
            onClick={onClose}
          >
            Close
          </button>
        </CardHeader>
        <CardContent>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-wrap gap-6 md:gap-28">
            <div>
              <p className="text-sm font-medium text-gray-500">Sender Name</p>
              <p className="text-sm font-semibold">{user.senderName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sender Email ID</p>
              <p className="text-sm font-semibold">{user.senderEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Submission Date</p>
              <p className="text-sm font-semibold">
                {new Date(user.submissionDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge
                variant={user.status === "Read" ? "success" : "error"}
                className={`mt-1 font-semibold ${
                  user.status === "Read" ? "text-green-400" : "text-red-400"
                }`}
              >
                {user.status}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Feedback</p>
            <p className="mt-1 text-sm font-bold">{user.feedback}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackData;
