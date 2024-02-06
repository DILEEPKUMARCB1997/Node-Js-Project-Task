function getCurrentNetworkInterface() {
  try {
    const result = apiCore.db.getCurrentIFace({}, true);
    const result1 = apiCore.db.getLoginDetails(
      { username: "admin", password: "admin123" },
      true
    );
    if (result == null) {
      return {
        success: false,
        msg: "Error in - get all network interfaces error",
      };
    }
    return {
      success: true,
      msg: "Get all network interfaces successful",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      msg: "Error in - get all network interfaces error",
    };
  }
}



function getLoginDetails(user) {
  try {
    const result = apiCore.db.getLoginDetails(
      { username: user.loginUsername, password: user.loginPassword },
      true
    );
    if (result == null) {
      return { success: false, msg: "Error in - get all User details" };
    }
    return {
      success: true,
      msg: "Get all user details successful",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      msg: "Error in - get all network interfaces error",
    };
  }
}

