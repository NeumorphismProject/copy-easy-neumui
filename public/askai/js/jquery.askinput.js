(function($) {
    $.fn.askInput = function(options) {
        const settings = $.extend({
            placeholder: 'Type your message...',
            autoFocus: true,
            initialValue: '',
            onTextChange: null,
            onEnter: null,
            onBackspace: null
        }, options)

        return this.each(function() {
            const $editor = $(this)
            let value = settings.initialValue
            let isComposing = false // 标记输入法组合状态

            // Get current cursor position
            function getCursorPosition() {
                const selection = window.getSelection()
                if (!selection || !selection.focusNode) return null
                return {
                    node: selection.focusNode,
                    offset: selection.focusOffset
                }
            }

            // Set cursor to end
            function setCursorToEnd() {
                const range = document.createRange()
                const selection = window.getSelection()
                const element = $editor[0]
                if (element.childNodes.length) {
                    const lastNode = element.lastChild
                    if (lastNode.nodeType === Node.TEXT_NODE) {
                        range.setStart(lastNode, lastNode.textContent?.length || 0)
                    } else if (lastNode.nodeName === 'SPAN' && lastNode.firstChild) {
                        range.setStart(lastNode.firstChild, lastNode.textContent?.length || 0)
                    } else {
                        range.setStartAfter(lastNode)
                    }
                    range.collapse(true)
                    selection?.removeAllRanges()
                    selection?.addRange(range)
                }
            }

            // Auto adjust height
            function autoFixHeight() {
                const element = $editor[0]
                if (!element) return
                $editor.css('height', 'auto')
                const scrollHeight = element.scrollHeight
                $editor.css('height', !element.textContent || scrollHeight < 56 ? '42px' : `${scrollHeight}px`)
            }

            // Format @mentions
            function formatInnerHTML(text) {
                return text.replace(/@([\w\u4e00-\u9fa5]+)/g, '<span class="high-light">@$1</span>')
            }

            // Initialize editor
            function initialize() {
                $editor
                    .attr('data-placeholder', settings.placeholder)
                    .attr('contenteditable', true)
                    .addClass('editor')
                    .html(formatInnerHTML(value))
                
                autoFixHeight()
                
                if (settings.autoFocus) {
                    $editor.focus()
                    setCursorToEnd()
                }
            }

            // Handle paste event
            $editor.on('paste', function(e) {
                e.preventDefault()
                const prevCursor = getCursorPosition()
                const clipboardData = e.originalEvent.clipboardData || window.clipboardData
                const pastedText = clipboardData.getData('text').replace(/\n/g, '') // Remove newlines
                const currentText = $editor.text() || ''
                let newText = ''
                
                // Insert pasted text at cursor position
                if (prevCursor && prevCursor.node) {
                    const textNode = prevCursor.node
                    const offset = prevCursor.offset
                    if (textNode.nodeType === Node.TEXT_NODE) {
                        newText = currentText.slice(0, offset) + pastedText + currentText.slice(offset)
                    } else {
                        newText = currentText + pastedText // Fallback to appending
                    }
                } else {
                    newText = currentText + pastedText // Append if no cursor position
                }

                value = newText
                $editor.html(formatInnerHTML(value))
                autoFixHeight()

                // Restore cursor to end of pasted content
                const newOffset = prevCursor ? (prevCursor.offset + pastedText.length) : value.length
                const range = document.createRange()
                const selection = window.getSelection()
                let offsetAccumulator = 0
                let targetNode = $editor[0].firstChild
                let found = false

                while (targetNode) {
                    const nodeLength = targetNode.nodeType === Node.TEXT_NODE ? targetNode.length : targetNode.textContent.length
                    if (offsetAccumulator + nodeLength >= newOffset) {
                        const localOffset = newOffset - offsetAccumulator
                        if (targetNode.nodeType === Node.TEXT_NODE) {
                            range.setStart(targetNode, Math.min(localOffset, nodeLength))
                        } else if (targetNode.nodeName === 'SPAN' && targetNode.firstChild) {
                            range.setStart(targetNode.firstChild, Math.min(localOffset, targetNode.textContent.length))
                        }
                        found = true
                        break
                    }
                    offsetAccumulator += nodeLength
                    targetNode = targetNode.nextSibling
                }

                if (!found && $editor[0].childNodes.length) {
                    setCursorToEnd()
                } else {
                    range.collapse(true)
                    selection.removeAllRanges()
                    selection.addRange(range)
                }

                if (settings.onTextChange) {
                    settings.onTextChange(value)
                }
            })

            // Handle composition events for input method (e.g., Chinese IME)
            $editor.on('compositionstart', function() {
                isComposing = true
            })

            $editor.on('compositionend', function() {
                isComposing = false
                const prevCursor = getCursorPosition()
                value = $editor.text() || ''
                $editor.html(formatInnerHTML(value))
                setCursorToEnd() // Simplified to set to end after composition
                autoFixHeight()
                if (settings.onTextChange) {
                    settings.onTextChange(value)
                }
            })

            // Handle input
            $editor.on('input', function() {
                if (isComposing) return
                value = $editor.text() || ''
                $editor.html(formatInnerHTML(value))
                setCursorToEnd() // Simplified to set to end after input
                autoFixHeight()
                if (settings.onTextChange) {
                    settings.onTextChange(value)
                }
            })

            // Handle keydown
            $editor.on('keydown', function(e) {
                if (isComposing) return
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    if (settings.onEnter) {
                        settings.onEnter($editor.text() || '')
                        $editor.html('')
                        value = ''
                        autoFixHeight()
                    }
                }
                if (e.key === 'Backspace' && settings.onBackspace) {
                    settings.onBackspace($editor.text() || '')
                }
            })

            // Public methods
            $editor.data('askInput', {
                focus: function() {
                    $editor.focus()
                    setCursorToEnd()
                },
                updateValue: function(newValue) {
                    value = newValue
                    $editor.html(formatInnerHTML(value))
                    autoFixHeight()
                    setCursorToEnd()
                },
                getValue: function() {
                    return value
                }
            })

            // Initialize
            initialize()
        })
    }
})(jQuery)