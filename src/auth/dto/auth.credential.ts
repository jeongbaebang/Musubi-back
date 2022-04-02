import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export const validationTest = {
  email: {
    RegExp:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message:
      '올바른 이메일 주소가 아닙니다. 확인 후 다시 입력해 주세요.' as const,
  },
  length: {
    min: {
      message:
        '보안 강화를 위해 비밀번호는 최소 8자 이상으로 입력해 주세요.' as const,
    },
    max: {
      message: '최대 길이는 50글자 미만입니다.' as const,
    },
  },
  login: {
    duplicate: {
      message: '존재하는 사용자 이름입니다.' as const,
    },
    failure: {
      message:
        '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.' as const,
    },
    success: {
      message: '로그인 성공' as const,
    },
  },
};

export class AuthCredentialsDto {
  @IsString()
  @Matches(validationTest.email.RegExp, {
    message: validationTest.email.message,
  })
  @MaxLength(50, {
    message: validationTest.length.max.message,
  })
  username: string;

  @IsString()
  @MinLength(8, {
    message: validationTest.length.min.message,
  })
  @MaxLength(50, {
    message: validationTest.length.max.message,
  })
  password: string;
}
