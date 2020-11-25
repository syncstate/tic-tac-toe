module.exports = class PatchManager {
  // patches;
  constructor() {
    this.projectPatchesMap = new Map();
  }

  store(roomId, path, patch) {
    const projectPatches = this.projectPatchesMap.get(roomId);

    if (projectPatches) {
      const pathPatches = projectPatches.get(path);

      if (pathPatches) {
        pathPatches.push(patch);
      } else {
        projectPatches.set(path, [patch]);
      }
    } else {
      const pathPatchesMap = new Map();
      pathPatchesMap.set(path, [patch]);
      this.projectPatchesMap.set(roomId, pathPatchesMap);
    }
  }

  getAllPatches(roomId, path) {
    const projectPatches = this.projectPatchesMap.get(roomId);
    if (projectPatches) {
      const pathPatches = projectPatches.get(path);

      return pathPatches ? pathPatches : [];
    }

    return [];
  }
  deletePatches(roomId) {
    this.projectPatchesMap.delete(roomId);
  }
};
