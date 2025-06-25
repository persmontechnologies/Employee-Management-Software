import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PerformanceReviewFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    employeeId: isEditing ? "1" : "",
    reviewType: isEditing ? "quarterly" : "quarterly",
    reviewPeriod: isEditing ? "Q2 2025" : "Q2 2025",
    reviewDate: isEditing ? "2025-04-25" : "",
    managerNotes: isEditing
      ? "Please complete your self-assessment by April 15th."
      : "",
    selfAssessment: {
      achievements: isEditing
        ? "Completed the new user onboarding flow redesign ahead of schedule."
        : "",
      challenges: isEditing
        ? "Coordinating with the backend team on API changes was challenging."
        : "",
      strengths: isEditing ? "UI/UX design, cross-team collaboration." : "",
      improvement: isEditing ? "Need to improve documentation habits." : "",
      goals: isEditing ? "Complete advanced React certification by Q3." : "",
    },
    managerAssessment: {
      performance: isEditing ? "Exceeds expectations in most areas." : "",
      strengths: isEditing ? "Strong technical skills, great team player." : "",
      improvement: isEditing ? "Can improve on estimation accuracy." : "",
      recommendations: isEditing ? "Consider mentoring junior developers." : "",
    },
    ratings: {
      jobKnowledge: isEditing ? 4 : 0,
      workQuality: isEditing ? 5 : 0,
      productivity: isEditing ? 4 : 0,
      communication: isEditing ? 4 : 0,
      teamwork: isEditing ? 5 : 0,
      initiative: isEditing ? 4 : 0,
      problemSolving: isEditing ? 4 : 0,
    },
    overallRating: isEditing ? 4 : 0,
    comments: isEditing
      ? "Michael has shown consistent growth this quarter."
      : "",
    developmentPlan: isEditing
      ? "Focus on improving technical documentation skills."
      : "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section?: string,
    field?: string
  ) => {
    if (section && field) {
      setFormData({
        ...formData,
        [section]: {
          ...(formData[section as keyof typeof formData] as Record<
            string,
            any
          >),
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRatingChange = (category: string, value: number) => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [category]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/performance");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRatingStars = (category: string, currentRating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className={`h-6 w-6 ${
              star <= currentRating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {isEditing
          ? "Edit Performance Review"
          : "Schedule New Performance Review"}
      </h1>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "details"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Review Details
          </button>
          <button
            onClick={() => setActiveTab("self-assessment")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "self-assessment"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Self Assessment
          </button>
          <button
            onClick={() => setActiveTab("manager-assessment")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "manager-assessment"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Manager Assessment
          </button>
          <button
            onClick={() => setActiveTab("ratings")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "ratings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Ratings
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "summary"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Summary & Plan
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow rounded-lg p-6">
          {/* Review Details */}
          {activeTab === "details" && (
            <div>
              <h2 className="text-lg font-medium mb-4">Review Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="employeeId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Employee
                  </label>
                  <select
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Employee</option>
                    <option value="1">Michael Johnson - Engineering</option>
                    <option value="2">Emily Davis - Marketing</option>
                    <option value="3">David Wilson - Finance</option>
                    <option value="4">Sarah Brown - Engineering</option>
                    <option value="5">Jessica Smith - HR</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="reviewType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Review Type
                  </label>
                  <select
                    id="reviewType"
                    name="reviewType"
                    value={formData.reviewType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="quarterly">Quarterly Review</option>
                    <option value="mid-year">Mid-Year Review</option>
                    <option value="annual">Annual Review</option>
                    <option value="probation">Probation Review</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="reviewPeriod"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Review Period
                  </label>
                  <select
                    id="reviewPeriod"
                    name="reviewPeriod"
                    value={formData.reviewPeriod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Q1 2025">Q1 2025 (Jan-Mar)</option>
                    <option value="Q2 2025">Q2 2025 (Apr-Jun)</option>
                    <option value="Mid-Year 2025">Mid-Year 2025</option>
                    <option value="Q3 2025">Q3 2025 (Jul-Sep)</option>
                    <option value="Q4 2025">Q4 2025 (Oct-Dec)</option>
                    <option value="Annual 2025">Annual 2025</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="reviewDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="reviewDate"
                    name="reviewDate"
                    value={formData.reviewDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="managerNotes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Manager Notes (visible to employee)
                </label>
                <textarea
                  id="managerNotes"
                  name="managerNotes"
                  rows={3}
                  value={formData.managerNotes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          )}

          {/* Self Assessment */}
          {activeTab === "self-assessment" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Self Assessment</h2>
                <div className="text-sm text-gray-500">
                  To be completed by employee
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="achievements"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Key Achievements
                </label>
                <textarea
                  id="achievements"
                  rows={3}
                  value={formData.selfAssessment.achievements}
                  onChange={(e) =>
                    handleInputChange(e, "selfAssessment", "achievements")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What were your key accomplishments during this period?"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="challenges"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Challenges Faced
                </label>
                <textarea
                  id="challenges"
                  rows={3}
                  value={formData.selfAssessment.challenges}
                  onChange={(e) =>
                    handleInputChange(e, "selfAssessment", "challenges")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What challenges did you face during this period?"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="strengths"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Strengths
                </label>
                <textarea
                  id="strengths"
                  rows={2}
                  value={formData.selfAssessment.strengths}
                  onChange={(e) =>
                    handleInputChange(e, "selfAssessment", "strengths")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What do you consider to be your key strengths?"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="improvement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Areas for Improvement
                </label>
                <textarea
                  id="improvement"
                  rows={2}
                  value={formData.selfAssessment.improvement}
                  onChange={(e) =>
                    handleInputChange(e, "selfAssessment", "improvement")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What areas would you like to improve in?"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Professional Goals
                </label>
                <textarea
                  id="goals"
                  rows={2}
                  value={formData.selfAssessment.goals}
                  onChange={(e) =>
                    handleInputChange(e, "selfAssessment", "goals")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What are your professional goals for the next period?"
                ></textarea>
              </div>
            </div>
          )}

          {/* Manager Assessment */}
          {activeTab === "manager-assessment" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Manager Assessment</h2>
                <div className="text-sm text-gray-500">
                  To be completed by manager
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="performance"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Performance Summary
                </label>
                <textarea
                  id="performance"
                  rows={3}
                  value={formData.managerAssessment.performance}
                  onChange={(e) =>
                    handleInputChange(e, "managerAssessment", "performance")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide a summary of the employee's performance during this period"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="managerStrengths"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Observed Strengths
                </label>
                <textarea
                  id="managerStrengths"
                  rows={2}
                  value={formData.managerAssessment.strengths}
                  onChange={(e) =>
                    handleInputChange(e, "managerAssessment", "strengths")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What strengths has the employee demonstrated?"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="managerImprovement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Areas for Improvement
                </label>
                <textarea
                  id="managerImprovement"
                  rows={2}
                  value={formData.managerAssessment.improvement}
                  onChange={(e) =>
                    handleInputChange(e, "managerAssessment", "improvement")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What areas should the employee focus on improving?"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="recommendations"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Recommendations
                </label>
                <textarea
                  id="recommendations"
                  rows={2}
                  value={formData.managerAssessment.recommendations}
                  onChange={(e) =>
                    handleInputChange(e, "managerAssessment", "recommendations")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What recommendations do you have for the employee's growth?"
                ></textarea>
              </div>
            </div>
          )}

          {/* Performance Ratings */}
          {activeTab === "ratings" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Performance Ratings</h2>
                <div className="text-sm text-gray-500">
                  <span className="text-yellow-500">★</span> Poor
                  <span className="text-yellow-500 ml-2">★★</span> Below
                  Expectations
                  <span className="text-yellow-500 ml-2">★★★</span> Meets
                  Expectations
                  <span className="text-yellow-500 ml-2">★★★★</span> Exceeds
                  Expectations
                  <span className="text-yellow-500 ml-2">★★★★★</span>{" "}
                  Outstanding
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Knowledge
                    </label>
                    <p className="text-xs text-gray-500">
                      Understanding of role, procedures, and relevant skills
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars(
                      "jobKnowledge",
                      formData.ratings.jobKnowledge
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Work Quality
                    </label>
                    <p className="text-xs text-gray-500">
                      Accuracy, thoroughness, and overall excellence of work
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars(
                      "workQuality",
                      formData.ratings.workQuality
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Productivity
                    </label>
                    <p className="text-xs text-gray-500">
                      Efficiency, meeting deadlines, and output volume
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars(
                      "productivity",
                      formData.ratings.productivity
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Communication
                    </label>
                    <p className="text-xs text-gray-500">
                      Clarity, effectiveness, and transparency in communication
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars(
                      "communication",
                      formData.ratings.communication
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Teamwork
                    </label>
                    <p className="text-xs text-gray-500">
                      Collaboration, cooperation, and supporting team goals
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars("teamwork", formData.ratings.teamwork)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Initiative
                    </label>
                    <p className="text-xs text-gray-500">
                      Self-starting, proactivity, and taking ownership
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars(
                      "initiative",
                      formData.ratings.initiative
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Problem Solving
                    </label>
                    <p className="text-xs text-gray-500">
                      Analyzing issues and implementing effective solutions
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    {renderRatingStars(
                      "problemSolving",
                      formData.ratings.problemSolving
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 font-bold">
                      Overall Rating
                    </label>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, overallRating: star })
                          }
                          className={`h-8 w-8 ${
                            star <= formData.overallRating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary & Development Plan */}
          {activeTab === "summary" && (
            <div>
              <h2 className="text-lg font-medium mb-4">
                Summary & Development Plan
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={3}
                  value={formData.comments}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional comments or observations"
                ></textarea>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="developmentPlan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Development Plan
                </label>
                <textarea
                  id="developmentPlan"
                  name="developmentPlan"
                  rows={5}
                  value={formData.developmentPlan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Outline specific development goals, action items, resources, and timeline"
                ></textarea>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Next Steps
                </h3>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                  <li>
                    Schedule a meeting with the employee to discuss this review
                  </li>
                  <li>Sign and submit the review for HR approval</li>
                  <li>Follow up on development plan action items in 30 days</li>
                  <li>Set calendar reminder for next performance cycle</li>
                </ol>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/performance")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            {activeTab !== "details" && (
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                onClick={() => {
                  const tabs = [
                    "details",
                    "self-assessment",
                    "manager-assessment",
                    "ratings",
                    "summary",
                  ];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }}
              >
                Previous
              </button>
            )}
            {activeTab !== "summary" ? (
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => {
                  const tabs = [
                    "details",
                    "self-assessment",
                    "manager-assessment",
                    "ratings",
                    "summary",
                  ];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Review"
                  : "Create Review"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PerformanceReviewFormPage;
