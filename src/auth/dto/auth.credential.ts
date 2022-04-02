import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export const validationTest = {
  email: {
    RegExp:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message:
      '올바른 이메일 주소가 아닙니다. 확인 후 다시 입력해 주세요.' as const,
  },
  minLength: {
    message:
      '보안 강화를 위해 비밀번호는 최소 8자 이상으로 입력해 주세요.' as const,
  },
  maxLength: {
    message: '최대 길이는 50글자 미만입니다.' as const,
  },
  duplicateUsername: {
    message: '존재하는 사용자 이름입니다.' as const,
  },
};

export class AuthCredentialsDto {
  @IsString()
  @Matches(validationTest.email.RegExp, {
    message: validationTest.email.message,
  })
  @MaxLength(50, {
    message: validationTest.maxLength.message,
  })
  username: string;

  @IsString()
  @MinLength(8, {
    message: validationTest.minLength.message,
  })
  @MaxLength(50, {
    message: validationTest.maxLength.message,
  })
  password: string;
}
