import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Calculator,
  BookOpen,
  User,
  Hash,
  Award,
  TrendingUp,
  Info,
  X,
  BarChart3,
  Target,
  FileText,
  GraduationCap,
} from "lucide-react";

const StudentGradingSystem = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", mark: 0, credit: 0 }]);
  const [totalMarks, setTotalMarks] = useState(null);
  const [showAverage, setShowAverage] = useState(false);
  const [average, setAverage] = useState(null);
  const [showSgpaOption, setShowSgpaOption] = useState(false);
  const [sgpa, setSgpa] = useState(null);
  const [sgpaDetails, setSgpaDetails] = useState([]);
  const [showGradeScale, setShowGradeScale] = useState(false);

  const gradeScale = {
    O: { points: 10, rating: "Outstanding", minMarks: 90 },
    "A+": { points: 9.5, rating: "Excellent", minMarks: 85 },
    A: { points: 9, rating: "Very Good", minMarks: 80 },
    "B+": { points: 8, rating: "Good", minMarks: 75 },
    B: { points: 7, rating: "Above Average", minMarks: 70 },
    C: { points: 6, rating: "Average", minMarks: 60 },
    P: { points: 5, rating: "Pass", minMarks: 50 },
    F: { points: 0, rating: "Fail", minMarks: 0 },
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", mark: 0, credit: 0 }]);
  };

  const removeSubject = (index) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = field === "name" ? value : parseFloat(value) || 0;
    setSubjects(updated);
  };

  const getGradeFromMarks = (marks) => {
    if (marks >= 90) return "O";
    if (marks >= 85) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 75) return "B+";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "P";
    return "F";
  };

  const calculateTotal = () => {
    const total = subjects.reduce((sum, subject) => sum + subject.mark, 0);
    setTotalMarks(total);
    setShowAverage(false);
    setAverage(null);
    setShowSgpaOption(true);
    setSgpa(null);
    setSgpaDetails([]);
  };

  const handleAverageChoice = (choice) => {
    if (choice === "yes") {
      const avg = totalMarks / subjects.length;
      setAverage(avg);
    }
    setShowAverage(true);
  };

  const calculateSGPA = () => {
    const hasAllCredits = subjects.every(
      (subject) => subject.credit > 0 && subject.name.trim() !== ""
    );

    if (!hasAllCredits) {
      alert("Please enter credits for all subjects before calculating SGPA");
      return;
    }

    let totalCreditPoints = 0;
    let totalCredits = 0;
    const details = [];

    subjects.forEach((subject) => {
      const grade = getGradeFromMarks(subject.mark);
      const gradePoint = gradeScale[grade].points;
      const creditPoints = subject.credit * gradePoint;

      totalCreditPoints += creditPoints;
      totalCredits += subject.credit;

      details.push({
        subject: subject.name,
        mark: subject.mark,
        credit: subject.credit,
        grade: grade,
        gradePoint: gradePoint,
        creditPoints: creditPoints,
      });
    });

    const calculatedSgpa =
      totalCredits > 0 ? totalCreditPoints / totalCredits : 0;
    setSgpa(calculatedSgpa.toFixed(2));
    setSgpaDetails(details);
  };

  const getSgpaGrade = () => {
    if (!sgpa) return "";
    const sgpaValue = parseFloat(sgpa);

    if (sgpaValue >= 9.5) return "O";
    if (sgpaValue >= 9.0) return "A+";
    if (sgpaValue >= 8.5) return "A";
    if (sgpaValue >= 7.5) return "B+";
    if (sgpaValue >= 6.5) return "B";
    if (sgpaValue >= 5.5) return "C";
    if (sgpaValue >= 5.0) return "P";
    return "F";
  };

  const getCurrentProgress = () => {
    const filledSubjects = subjects.filter((s) => s.name.trim() !== "");
    const totalSubjects = subjects.length;
    const hasStudentInfo =
      rollNumber.trim() !== "" && studentName.trim() !== "";
    return {
      subjectsProgress: (filledSubjects.length / totalSubjects) * 100,
      hasStudentInfo,
      filledSubjects: filledSubjects.length,
      totalSubjects,
    };
  };

  const progress = getCurrentProgress();

  // --- COMPACT LAYOUT & SMALLER COMPONENTS ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-xl mx-auto p-2 md:p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow">
              <GraduationCap className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Student Grading System
            </h1>
          </div>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-snug">
            Academic evaluation with SGPA and grade analysis
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => setShowGradeScale(true)}
              className="bg-white/80 text-slate-700 px-3 py-1.5 rounded hover:bg-white transition shadow border border-white/50 flex items-center gap-1 text-xs font-medium"
            >
              <Info size={14} />
              Grade Scale
            </button>
          </div>
        </div>

        {/* Main Card Layout */}
        <div className="space-y-4">
          {/* Student Details Section */}
          <div className="bg-white/80 rounded-2xl shadow p-4 border border-white/50">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded">
                <User className="text-white" size={14} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Student Info</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Hash size={12} />
                  Roll Number
                </label>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white/90 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                  placeholder="Roll No"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <User size={12} />
                  Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white/90 border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                  placeholder="Student Name"
                />
              </div>
            </div>
          </div>

          {/* Subjects Section */}
          <div className="bg-white/80 rounded-2xl shadow p-4 border border-white/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gradient-to-r from-green-500 to-green-600 rounded">
                  <BookOpen className="text-white" size={14} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Subjects</h2>
              </div>
              <button
                onClick={addSubject}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded hover:from-green-600 hover:to-emerald-700 shadow flex items-center gap-1 text-xs font-medium"
              >
                <Plus size={14} />
                Add
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-3 border border-slate-200 shadow-sm hover:shadow transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) =>
                          updateSubject(index, "name", e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 transition"
                        placeholder={`Subject ${index + 1}`}
                      />
                    </div>
                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(index)}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition mt-3"
                        title="Remove"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Mark
                      </label>
                      <input
                        type="number"
                        value={subject.mark}
                        onChange={(e) =>
                          updateSubject(index, "mark", e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 transition"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Credit
                      </label>
                      <input
                        type="number"
                        value={subject.credit}
                        onChange={(e) =>
                          updateSubject(index, "credit", e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 transition"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateTotal}
              className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded hover:from-blue-700 hover:to-indigo-700 shadow flex items-center justify-center gap-2 font-semibold text-sm"
            >
              <Calculator size={16} />
              Calculate
            </button>
          </div>

          {/* Results & Analysis Section */}
          {(totalMarks !== null || sgpa) && (
            <div className="space-y-4">
              {/* Academic Results Section */}
              {totalMarks !== null && (
                <div className="bg-white/80 rounded-2xl shadow p-4 border border-white/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded">
                      <TrendingUp className="text-white" size={14} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Results
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* Total Marks */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                      <div className="text-center">
                        <p className="text-xs font-semibold text-blue-800 mb-1">
                          Total Marks
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          {totalMarks}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          of {subjects.length * 100}
                        </p>
                      </div>
                    </div>

                    {/* Average Choice */}
                    {!showAverage && (
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-3 border border-amber-200">
                        <p className="text-slate-700 mb-2 font-medium text-xs">
                          Calculate Average?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAverageChoice("yes")}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-1 rounded hover:from-green-600 hover:to-emerald-700 shadow-md text-xs font-medium"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => handleAverageChoice("no")}
                            className="flex-1 bg-gradient-to-r from-slate-500 to-gray-600 text-white py-1 rounded hover:from-slate-600 hover:to-gray-700 shadow-md text-xs font-medium"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Average Display */}
                    {showAverage && average && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                        <div className="text-center">
                          <p className="text-xs font-semibold text-green-800 mb-1">
                            Average
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            {average.toFixed(2)}%
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Grade: {getGradeFromMarks(average)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* SGPA Option */}
                    {showSgpaOption && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-200">
                        <p className="text-slate-700 mb-2 font-medium text-xs">
                          Calculate SGPA?
                        </p>
                        <button
                          onClick={calculateSGPA}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-1 rounded hover:from-purple-700 hover:to-indigo-700 shadow-md flex items-center justify-center gap-1 text-xs font-medium"
                        >
                          <Calculator size={13} />
                          SGPA
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SGPA Results */}
              {sgpa && (
                <div className="bg-white/80 rounded-2xl shadow p-4 border border-white/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded">
                      <Award className="text-white" size={14} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">SGPA</h2>
                  </div>

                  {/* SGPA Display */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 mb-3 border border-indigo-200">
                    <div className="text-center">
                      <p className="text-xs font-semibold text-indigo-800 mb-1">
                        SGPA
                      </p>
                      <p className="text-2xl font-bold text-indigo-600 mb-1">
                        {sgpa}
                      </p>
                      <span className="inline-flex items-center gap-1 bg-white/50 rounded px-2 py-1 text-xs font-bold text-indigo-700">
                        Grade: {getSgpaGrade()}
                      </span>
                      <p className="text-xs text-indigo-600 mt-1">
                        {gradeScale[getSgpaGrade()]?.rating}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-3 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-1 text-sm">
                      <FileText size={13} />
                      Breakdown
                    </h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {sgpaDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="bg-white rounded p-2 border border-slate-200 shadow-sm text-xs"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-slate-700">
                              {detail.subject}
                            </span>
                            <span className="font-bold text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">
                              {detail.grade}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-slate-600">
                            <div>Mark: {detail.mark}</div>
                            <div>Credit: {detail.credit}</div>
                            <div>GPt: {detail.gradePoint}</div>
                            <div>CPt: {detail.creditPoints}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <div className="bg-indigo-50 rounded p-2 text-xs">
                        <p className="text-slate-600 mb-1">
                          <strong>Formula:</strong> SGPA = Σ(Credit × GPt) /
                          Σ(Credit)
                        </p>
                        <div className="flex justify-between">
                          <span className="text-slate-700">
                            <strong>Total CPt:</strong>{" "}
                            {sgpaDetails.reduce(
                              (sum, d) => sum + d.creditPoints,
                              0
                            )}
                          </span>
                          <span className="text-slate-700">
                            <strong>Total Credit:</strong>{" "}
                            {sgpaDetails.reduce((sum, d) => sum + d.credit, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Dashboard & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Progress Dashboard */}
            <div className="bg-white/80 rounded-2xl shadow p-4 border border-white/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded">
                  <BarChart3 className="text-white" size={14} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Progress</h2>
              </div>

              <div className="space-y-3">
                {/* Student Info Status */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-700 text-xs">
                      Student Info
                    </h3>
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        progress.hasStudentInfo
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {progress.hasStudentInfo ? "Complete" : "Incomplete"}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600">
                    {progress.hasStudentInfo
                      ? "Student details entered"
                      : "Please enter roll & name"}
                  </div>
                </div>

                {/* Subjects Progress */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-slate-700 text-xs">
                      Subjects
                    </h3>
                    <span className="text-xs font-medium text-slate-600">
                      {progress.filledSubjects}/{progress.totalSubjects}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition"
                      style={{ width: `${progress.subjectsProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-600">
                    {progress.filledSubjects} of {progress.totalSubjects}{" "}
                    completed
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded p-2 border border-slate-200">
                    <div className="flex items-center gap-1 mb-1">
                      <FileText size={12} className="text-slate-500" />
                      <span className="text-xs font-medium text-slate-600">
                        Subjects
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                      {subjects.length}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-white rounded p-2 border border-slate-200">
                    <div className="flex items-center gap-1 mb-1">
                      <Target size={12} className="text-slate-500" />
                      <span className="text-xs font-medium text-slate-600">
                        Credit
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-800">
                      {subjects.reduce((sum, s) => sum + s.credit, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded">
                  <Info className="text-white" size={14} />
                </div>
                <h3 className="text-base font-bold text-amber-800">
                  How to Use
                </h3>
              </div>
              <div className="space-y-2 text-xs text-amber-700">
                <div className="flex items-start gap-1">
                  <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs mt-[1.5px]">
                    1
                  </div>
                  <div>Enter roll number & name</div>
                </div>
                <div className="flex items-start gap-1">
                  <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs mt-[1.5px]">
                    2
                  </div>
                  <div>Add subject, mark, credit</div>
                </div>
                <div className="flex items-start gap-1">
                  <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs mt-[1.5px]">
                    3
                  </div>
                  <div>Click Calculate for results</div>
                </div>
                <div className="flex items-start gap-1">
                  <div className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-xs mt-[1.5px]">
                    4
                  </div>
                  <div>Calculate SGPA for analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Scale Modal */}
        {showGradeScale && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-2 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-800">
                    Grade Scale
                  </h3>
                  <button
                    onClick={() => setShowGradeScale(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded transition"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(gradeScale).map(([grade, info]) => (
                    <div
                      key={grade}
                      className="flex justify-between items-center py-2 px-3 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 hover:shadow transition"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                          <span className="font-bold text-white text-sm">
                            {grade}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-xs">
                            {info.rating}
                          </div>
                          <div className="text-xs text-slate-600">
                            {info.minMarks}+ marks
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600 text-sm">
                          {info.points} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGradingSystem;
