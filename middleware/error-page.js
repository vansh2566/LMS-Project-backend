export const customErrorPage = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Custom messages based on status code
    let customMessage = "";
    switch (statusCode) {
        case 400:
            customMessage = "Oops! Something's not quite right with your request. Let's double-check those details!";
            break;
        case 401:
            customMessage = "Hold on! Looks like you need to log in first. Your session might have expired.";
            break;
        case 403:
            customMessage = "Sorry! You don't have permission to access this area of our learning platform.";
            break;
        case 404:
            customMessage = "We couldn't find what you're looking for. Our courses might have moved to a new location!";
            break;
        case 500:
            customMessage = "Our learning servers are taking a quick study break! Don't worry, we'll be back shortly.";
            break;
        default:
            customMessage = "Something unexpected happened in our virtual classroom. Let's try that again!";
    }

    // Send a custom error response
    res.status(statusCode).json({
        success: false,
        message: "LMS Learning Platform: " + message,
        error: {
            statusCode,
            customMessage,
            helpText: "Need help? Contact our support team or try refreshing the page.",
            details: process.env.NODE_ENV === 'development' ? err.stack : {}
        }
    });
};