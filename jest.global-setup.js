module.exports = async () => {
  // Snapshots and date assertions are timezone-sensitive; pin to SGT so CI (UTC) matches local runs.
  process.env.TZ = "Asia/Singapore";
};
