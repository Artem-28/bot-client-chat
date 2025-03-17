// Входящие команды
export const incomingCall = {
  OPEN_MESSENGER: 'open_messenger',
  CLOSE_MESSENGER: 'close_messenger',
  CHANGE_MESSENGER_MODE: 'change_messenger_mode'
}

// Исходящие команды
export const outgoingCall = {
  UPDATE_STATE: 'update_messenger_state'
}
const INCOMING_CALL_KEY = '_app_client_messenger'
const OUTGOING_CALL_KEY = '_app_client_widget'

export const useCommand = () => {
  let attachedCallback = null
  function sendCommand (type, payload) {
    if (typeof parent.postMessage !== 'function') return
    parent.postMessage({
      key: OUTGOING_CALL_KEY,
      type,
      payload
    }, '*')
  }

  function setCallback (callback) {
    if (typeof callback !== 'function') return
    attachedCallback = function (e) {
      if (e.data.key !== INCOMING_CALL_KEY) return
      callback(e.data)
    }
  }

  function setWindowEvent () {
    if (typeof window.addEventListener !== 'function') return
    window.removeEventListener('message', attachedCallback)
    window.addEventListener('message', attachedCallback)
  }

  function subscribeEvent (callback) {
    if (typeof window.postMessage !== 'function') return
    setCallback(callback)
    setWindowEvent()
  }

  function subscribe (callback) {
    if (typeof callback !== 'function') return
    subscribeEvent(callback)
  }

  return {
    sendCommand,
    subscribe
  }
}
