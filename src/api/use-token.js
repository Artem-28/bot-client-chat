function useToken () {
  function update (data) {
    const isValid = data && typeof data === 'object'
    if (!isValid) return
    localStorage.setItem('accessToken', data.accessToken || null)
    localStorage.setItem('tokenType', data.tokenType || null)
  }

  function remove () {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenType')
  }

  function get () {
    const token = localStorage.getItem('accessToken') || null
    const type = localStorage.getItem('tokenType') || null
    return {
      token,
      type,
      Authorization: `${type} ${token}`,
      valid: !!token && !!type
    }
  }

  return {
    update,
    remove,
    get
  }
}

export default useToken
