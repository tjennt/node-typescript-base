import { check, CustomValidator } from "express-validator";
import { User } from "../models/user.model";

const validateUserCreate = (): any => {
  const checkUserNameExists: CustomValidator = async (
    value: string,
    { req }
  ) => {
    const user = await User.findOne({ userName: value });
    if (user) {
      throw new Error(req.__("validate.username.already"));
    }
  };

  const checkPasswordConfirmation: CustomValidator = (
    value: string,
    { req }
  ) => {
    if (value !== req.body.user.password) {
      throw new Error(req.__("validate.password.confirmation.confim.old.pass"));
    }
    return true;
  };

  return [
    check("user.userName")
      .not()
      .isEmpty()
      .withMessage((value, { req }) => {
        return req.__("validate.username.empty");
      }),
    check("user.userName")
      .isAlphanumeric()
      .withMessage((value, { req }) => {
        return req.__("validate.username.is.alphanumeric");
      }),
    check("user.userName")
      .isLength({ min: 6 })
      .withMessage((value, { req }) => {
        return req.__("validate.username.is.length");
      }),
    check("user.userName").custom(checkUserNameExists),
    check("user.email")
      .not()
      .isEmpty()
      .withMessage((value, { req }) => {
        return req.__("validate.username.already");
      }),
    check("user.email")
      .isEmail()
      .withMessage((value, { req }) => {
        return req.__("username.does.not.empty");
      }),
    check("user.password")
      .not()
      .isEmpty()
      .withMessage((value, { req }) => {
        return req.__("validate.password.not.empty");
      }),
    check("user.password")
      .isLength({ min: 6 })
      .withMessage((value, { req }) => {
        return req.__("validate.password.length");
      }),
    check("user.passwordConfirmation")
      .isLength({ min: 6 })
      .withMessage((value, { req }) => {
        return req.__("validate.password.confirmation.confim.old.pass");
      }),
    check("user.passwordConfirmation").custom(checkPasswordConfirmation),
  ];
};

export { validateUserCreate };
