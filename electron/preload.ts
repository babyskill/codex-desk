import { contextBridge, ipcRenderer } from 'electron'
import type { DesktopApi } from '../src/types'

const desktopApi: DesktopApi = {
  getAppInfo: () => ipcRenderer.invoke('manager:get-app-info'),
  getState: () => ipcRenderer.invoke('manager:get-state'),
  saveState: (state) => ipcRenderer.invoke('manager:save-state', state),
  importState: () => ipcRenderer.invoke('manager:import-state'),
  exportState: (state) => ipcRenderer.invoke('manager:export-state', state),
  openPath: (targetPath) => ipcRenderer.invoke('manager:open-path', targetPath),
  openDataDirectory: () => ipcRenderer.invoke('manager:open-data-directory'),
  openAccountSession: (payload) =>
    ipcRenderer.invoke('manager:open-account-session', payload),
  openCodexWindow: (payload) =>
    ipcRenderer.invoke('manager:open-codex-window', payload),
  captureMachineCodexAuth: (payload) =>
    ipcRenderer.invoke('manager:capture-machine-codex-auth', payload),
  switchMachineCodexAuth: (payload) =>
    ipcRenderer.invoke('manager:switch-machine-codex-auth', payload),
  diagnoseCodexAuth: (payload) =>
    ipcRenderer.invoke('manager:diagnose-codex-auth', payload),
  readMachineCodexUsage: (payload) =>
    ipcRenderer.invoke('manager:read-machine-codex-usage', payload),
  readAccountRenewalDate: (payload) =>
    ipcRenderer.invoke('manager:read-account-renewal-date', payload),
  importChatBackup: (payload) =>
    ipcRenderer.invoke('manager:import-chat-backup', payload),
  readChatBackup: (payload) =>
    ipcRenderer.invoke('manager:read-chat-backup', payload),
  resetAccountSession: (payload) =>
    ipcRenderer.invoke('manager:reset-account-session', payload),
  syncAccountSession: (payload) =>
    ipcRenderer.invoke('manager:sync-account-session', payload),
  checkForUpdates: () => ipcRenderer.invoke('manager:check-for-updates'),
  installUpdate: () => ipcRenderer.invoke('manager:install-update'),
  onUpdateStatus: (listener) => {
    const eventName = 'manager:update-status'
    const wrappedListener = (_event: Electron.IpcRendererEvent, payload: unknown) => {
      listener(payload as Parameters<typeof listener>[0])
    }

    ipcRenderer.on(eventName, wrappedListener)
    return () => {
      ipcRenderer.removeListener(eventName, wrappedListener)
    }
  },
}

contextBridge.exposeInMainWorld('managerCodex', desktopApi)
