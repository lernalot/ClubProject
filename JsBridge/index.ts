/**
 * JSBridge - A common wrapper for bidirectional communication between WebView and native applications (iOS/Android).
 */
class JSBridge {
    constructor() {
        this.callbackId = 0;     // Unique identifier for callbacks
        this.callbacks = {};      // Store callback functions
        this.handlers = {
            // alert: (data) => {
            //     alert(data.message || 'Alert from JSBridge');
            //     return { status: 'alertDisplayed' };
            // }
        };       // Store registered handler functions
        this.initialized = false; // Initialization status

        // Initialize the communication mechanism
        this.init();
    }

    /**
     * Initializes the JSBridge and establishes a communication channel with the native layer.
     */
    init() {
        // ssr 兼容 server side render window judge
        if (this.initialized || typeof window === 'undefined') return;

        // Expose global methods for native calls
        window.JSBridge = {
            invoke: (handlerName, data, callbackId) => {
                this.invokeHandler(handlerName, data, callbackId);
            },
            callback: (callbackId, data) => {
                this.invokeCallback(callbackId, data);
            }
        };

        // Notify the native side that the JS environment is ready
        this.dispatchEvent('JSBridgeReady');
        this.initialized = true;
    }

    /**
     * Registers a JS method for native calls.
     * @param {string} handlerName - The name of the method to register.
     * @param {Function} handler - The handler function that processes the data.
     */
    registerHandler(handlerName, handler) {
        if (typeof handler !== 'function') {
            console.error(`JSBridge: Handler ${handlerName} must be a function.`);
            return;
        }

        this.handlers[handlerName] = handler;
        console.log(`JSBridge: Registered method ${handlerName}.`);
    }

    /**
     * Calls a method provided by the native application.
     * @param {string} handlerName - The name of the native method.
     * @param {any} data - Data to pass to the native method.
     * @param {Function} callback - Callback function for the response.
     */
    callHandler(handlerName, data = {}, callback) {
        if (!this.initialized) {
            console.error('JSBridge: Not initialized. Please wait for JSBridgeReady event.');
            return;
        }

        // Simulate calling the cashier method
        if (handlerName === 'openCashier') {
            console.log('Calling cashier, parameters:', data);
            setTimeout(() => {
                this.callHandler('cashierPaySucc', { status: 'paySucc', message: 'Cashier payment successful' }, callback);
            }, 2000);
        }

        // Generate a unique callback ID global uniquely
        const callbackId = callback ? `cb_${++this.callbackId}_${Date.now()}` : null;
        if (callbackId && typeof callback === 'function') {
            this.callbacks[callbackId] = callback; // Store the callback
        }

        // Construct the message to send to native
        const message = { handlerName, data, callbackId };
        this.dispatchToNative(message); // Send the message
    }

    /**
     * Handles native calls to JS methods.
     * @param {string} handlerName - The name of the method to invoke.
     * @param {any} data - Data passed from the native side.
     * @param {string} callbackId - Callback ID for returning results.
     */
    invokeHandler(handlerName, data, callbackId) {
        const handler = this.handlers[handlerName];

        if (!handler) {
            console.error(`JSBridge: Method ${handlerName} not registered.`);
            if (callbackId) {
                this.callbackToNative(callbackId, { error: `Method ${handlerName} not registered.` });
            }
            return;
        }

        try {
            const result = handler(data); // Execute the handler

            if (callbackId) {
                this.callbackToNative(callbackId, result); // Return result to native
            }
        } catch (error) {
            console.error(`JSBridge: Error executing ${handlerName}`, error);
            if (callbackId) {
                this.callbackToNative(callbackId, { error: error.message || 'Unknown error' });
            }
        }
    }

    /**
     * Processes callbacks from native.
     * @param {string} callbackId - The ID of the callback.
     * @param {any} data - Data returned from native.
     */
    invokeCallback(callbackId, data) {
        const callback = this.callbacks[callbackId];
        console.log('Invoking callback with ID:', callbackId, 'Data:', this.callbacks, callback);
        if (callback && typeof callback === 'function') {
            try {
                callback(data); // Execute the callback
            } catch (error) {
                console.error(`JSBridge: Error executing callback ${callbackId}`, error);
            }
            delete this.callbacks[callbackId]; // Clean up the callback
        } else if (callbackId) {
            console.warn(`JSBridge: Callback function ${callbackId} not found.`);
        }
    }

    /**
     * Sends data back to native through the callback ID.
     * @param {string} callbackId - The ID of the callback.
     * @param {any} data - Data to return to native.
     */
    callbackToNative(callbackId, data) {
        this.dispatchToNative({ callbackId, data });
    }

    /**
     * Sends a message to the native application.
     * @param {object} message - The message object to send.
     */
    dispatchToNative(message) {
        try {
            const messageStr = JSON.stringify(message);

            // Determine the platform and use the appropriate communication method
            if (this.isAndroid()) {
                if (window.AndroidJSBridge) {
                    window.AndroidJSBridge.invoke(messageStr); // Android native call
                } else {
                    console.error('JSBridge: Android environment does not have native bridge object.');
                }
            } else if (this.isIOS()) {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = `jsbridge://message?data=${encodeURIComponent(messageStr)}`;
                document.body.appendChild(iframe);
                setTimeout(() => {
                    document.body.removeChild(iframe); // Clean up the iframe
                }, 0);
                // Simulate async operation for native callback
                asyncClientOperation(messageStr, (error, result) => {
                    if (message.callbackId) {
                        this.invokeCallback(message.callbackId, error ? { error: error.message || 'Unknown error' } : result);
                    }
                });
            } else {
                // Handle unknown environments
                asyncClientOperation(messageStr, (error, result) => {
                    if (message.callbackId) {
                        this.invokeCallback(message.callbackId, error ? { error: error.message || 'Unknown error' } : result);
                    }
                });
                console.warn('JSBridge: Unknown environment, unable to send message', message);
            }
        } catch (error) {
            console.error('JSBridge: Failed to send message to native', error);
        }
    }

    /**
     * Dispatches custom events.
     * @param {string} eventName - The name of the event.
     * @param {any} data - Data associated with the event.
     */
    dispatchEvent(eventName, data = null) {
        const event = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(event); // Dispatch the event
    }

    /**
     * Checks if the current environment is Android.
     * @returns {boolean} - True if Android, else false.
     */
    isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }

    /**
     * Checks if the current environment is iOS.
     * @returns {boolean} - True if iOS, else false.
     */
    isIOS() {
        return /iPhone|iPad|iPod|iOS/i.test(navigator.userAgent);
    }
}

// Instantiate the JSBridge
const jsBridge = new JSBridge();

/**
 * Utility to wait for JSBridge initialization to complete.
 * @param {Function} callback - The callback to execute after initialization.
 */
function readyJSBridge(callback) {
    if (typeof callback !== 'function') return;

    if (jsBridge.initialized) {
        callback(jsBridge);
    } else {
        window.addEventListener('JSBridgeReady', () => {
            callback(jsBridge);
        }, { once: true }); // Execute the callback only once
    }
}

/**
 * Simulates an asynchronous operation for the client.
 * @param {string} data - Data to process.
 * @param {Function} callback - Callback to handle the result.
 */
function asyncClientOperation(data, callback) {
    console.log('Client processing data asynchronously:', data);
    const jsData = JSON.parse(data);
    const handlerName = jsData.handlerName;
    const res = dealDiffBridge(handlerName);
    // window.jsBridge.invokeCallback(jsData.callbackId, res);
    
    // Simulate asynchronous processing (e.g., network requests)
    setTimeout(() => {
        try {
            callback(null, res); // Call success callback
        } catch (error) {
            callback(error, null); // Call error callback
        }
    }, 1000); // Simulate a delay of 1 second
}

/**
 * Handles different bridge operations based on the method name.
 * @param {string} methodName - The method name to handle.
 * @returns {object} - The result of the operation.
 */
function dealDiffBridge(methodName = '') {
    switch (methodName) {
        case 'getUserInfo':
            return { name: 'name', token: '1234567890abcdef' };
        case 'getDeviceInfo':
            return {
                platform: jsBridge.isIOS() ? 'iOS' : (jsBridge.isAndroid() ? 'Android' : 'Unknown'),
                userAgent: navigator.userAgent
            };
        case 'openCashier':
            // java.open
            return { status: 'openSucc', message: 'Cashier opened successfully.' };
        case 'cashierPaySucc':
            return { status: 'paySucc', message: 'Cashier payment successful.' };
        case 'navigateToWeb':
            return { status: 'navigated', message: 'Navigated to web page.', success: 1 };
        default:
            return { error: 'Unknown method' };
    }
}

// Expose to global scope
if (typeof window !== 'undefined') {
    window.jsBridge = jsBridge;
    window.readyJSBridge = readyJSBridge;
}

export default jsBridge;