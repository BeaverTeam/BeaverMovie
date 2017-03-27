export class Validator {
  isSignInUsernameVisited: boolean = false;
  isSignInPasswordVisited: boolean = false;
  isSignUpUsernameVisited: boolean = false;
  isSignUpPasswordVisited: boolean = false;
  isSignUpConfirmVisited: boolean = false;

  constructor() {}

  // 清空所有 input 的访问记录
  clearVisits() {
    this.isSignInUsernameVisited = false;
    this.isSignInPasswordVisited = false;
    this.isSignUpUsernameVisited = false;
    this.isSignUpPasswordVisited = false;
    this.isSignUpConfirmVisited = false;
  }

  // 登录的校验器
  signInValidator(formData, inputId) {
    // 判断哪些 input 已经被访问过
    if (inputId == 0) { this.isSignInUsernameVisited = true; }
    else if (inputId == 1) { this.isSignInPasswordVisited = true; }
    else { this.isSignInUsernameVisited = this.isSignInPasswordVisited = true; }

    // 从函数参数中读取数据
    let username = formData.signInUsername;
    let password = formData.signInPassword;
    let errorMessage: string = '';

    // 定义校验规则
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    // 对用户名进行校验
    if (this.isSignInUsernameVisited) {
      if (username == null || username == undefined || username == '')
        errorMessage = '用户名不能为空';
      else if (username.length < 5 || username.length > 10)
        errorMessage = '用户名长度需在 5 到 10 之间';
      else if (username.match(usernameRegex) == null)
        errorMessage = '用户名只能由字母和数字组成';
    }

    // 对密码进行校验
    if (this.isSignInPasswordVisited) {
      if (password == null || password == undefined || password == '')
        errorMessage = '密码不能为空';
      else if (password.length < 8 || password.length > 20)
        errorMessage = '密码长度需在 8 到 20 之间';
      else if (password.match(passwordRegex) == null)
        errorMessage = '密码不符合规范';
    }

    return errorMessage;
  }

  // 注册的校验器
  signUpValidator(formData, inputId) {
    // 判断哪些 input 已经被访问过
    if (inputId == 0) { this.isSignUpUsernameVisited = true; }
    else if (inputId == 1) { this.isSignUpPasswordVisited = true; }
    else if (inputId == 2) { this.isSignUpConfirmVisited = true; }
    else { this.isSignUpUsernameVisited = this.isSignUpPasswordVisited =
           this.isSignUpConfirmVisited = true; }

    // 从函数参数中读取数据
    let username = formData.signUpUsername;
    let password = formData.signUpPassword;
    let confirm = formData.signUpConfirm;
    let errorMessage: string = '';

    // 定义校验规则
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    // 对用户名进行校验
    if (this.isSignUpUsernameVisited) {
      if (username == null || username == undefined || username == '')
        errorMessage = '用户名不能为空';
      else if (username.length < 5 || username.length > 10)
        errorMessage = '用户名长度需在 5 到 10 之间';
      else if (username.match(usernameRegex) == null)
        errorMessage = '用户名只能由字母和数字组成';
    }

    // 对密码进行校验
    if (this.isSignUpPasswordVisited) {
      if (password == null || password == undefined || password == '')
        errorMessage = '密码不能为空';
      else if (password.length < 8 || password.length > 20)
        errorMessage = '密码长度需在 8 到 20 之间';
      else if (password.match(passwordRegex) == null)
        errorMessage = '密码包含不合法字符，或未包含数字或字母';
    }

    // 对确认密码进行校验
    if (this.isSignUpConfirmVisited) {
      if (confirm != password)
        errorMessage = '确认密码与密码不一致';
    }

    return errorMessage;
  }

}
