import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reports: [],
  report: {
    id: '',
    reportNum: '',
    urgency: '',
    inChargeId: '',
    title: '',
    description: '',
    location: { latitude: '', longitude: '' },
    isDone: false,
    comment: '',
    userReported: '',
    photo: '',
    status: '',
  },
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReports: (state, action) => {
      state.reports = action.payload;
    },
    setReport: (state, action) => {
      state.report = action.payload;
    },
    updateReport: (state, action) => {
      const { isDone, comment, id } = action.payload;
      state.report.isDone = isDone;
      state.report.comment = comment;
      const index = state.reports.findIndex((report) => report.id === id);
      state.reports[index].isDone = isDone;
      state.reports[index].comment = comment;
    },
  },
});

export const { addReports, setReport, updateReport } = reportSlice.actions;
export const selectReports = (state) => state.report.reports;
export const selectReport = (state) => state.report.report;

export default reportSlice.reducer;
