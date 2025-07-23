(function ($) {
	// Store the current AbortController
	let abortCtrl = null

	// The main API function
	$.apiPostAsk = function (options) {
			const settings = $.extend(
					{
							// url: 'http://127.0.0.1:3002/api/hello',
              url: 'https://copy-easy-neumui.vercel.app/api/hello',
							content: '',
							onMessage: function (message) { },
							onError: function (error) { },
							onDone: function () { },
							headers: { 'Content-Type': 'application/json' }
					},
					options
			)

			if (!settings.url) {
					console.error('apiPostAsk: URL 未提供')
					return Promise.reject(new Error('URL 未提供'))
			}

			return (async function () {
					try {
							// Abort any existing request
							if (abortCtrl !== null) {
									abortCtrl.abort()
							}
							// Create new AbortController for this request
							abortCtrl = new AbortController()

							const response = await fetch(settings.url, {
									method: 'POST',
									headers: settings.headers,
									body: JSON.stringify({ content: settings.content }),
									signal: abortCtrl.signal
							})

							if (!response.ok) {
									const data = await response.json()
									settings.onError({
											status: response.status,
											message: data.error || '请求失败'
									})
									return
							}

							const reader = response.body.getReader()
							const decoder = new TextDecoder()
							let buffer = ''

							while (true) {
									// Check if the request was aborted before reading
									if (abortCtrl.signal.aborted) {
											throw new DOMException('Aborted', 'AbortError')
									}

									const { done, value } = await reader.read()
									if (done) {
											settings.onDone()
											break
									}

									buffer += decoder.decode(value, { stream: true })
									const lines = buffer.split('\n\n')

									for (let i = 0; i < lines.length - 1; i++) {
											const line = lines[i].trim()
											if (line.startsWith('data: ')) {
													const dataStr = line.slice(6)
													if (dataStr === '[DONE]') {
															settings.onDone()
													} else {
															try {
																	const data = JSON.parse(dataStr)
																	settings.onMessage(data.message)
															} catch (e) {
																	console.error('JSON 解析错误:', e)
															}
													}
											}
									}
									buffer = lines[lines.length - 1]
							}
					} catch (error) {
							if (error.name === 'AbortError') {
									settings.onError({
											status: 0,
											message: '请求被取消'
									})
							} else {
									settings.onError({
											status: 0,
											message: error.message || '网络错误'
									})
							}
					} finally {
							// Clean up AbortController after request completes or errors
							abortCtrl = null
					}
			})()
	}

	// Expose abortRequest function
	$.apiPostAsk.abortRequest = function () {
			if (abortCtrl !== null) {
					abortCtrl.abort()
					abortCtrl = null
			}
	}
})(jQuery)