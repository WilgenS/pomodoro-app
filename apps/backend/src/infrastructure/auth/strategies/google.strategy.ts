import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

export interface GoogleUser {
  email: string;
  name: string;
  avatar: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'mock-id',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || 'mock-secret',
      callbackURL:
        configService.get<string>('GOOGLE_CALLBACK_URL') ||
        'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<GoogleUser> {
    const { name, emails, photos } = profile;

    const email = emails?.[0]?.value;
    if (!email) {
      throw new Error('No email found in Google profile');
    }

    return {
      email,
      name: `${name?.givenName ?? ''} ${name?.familyName ?? ''}`.trim(),
      avatar: photos?.[0]?.value ?? '',
    };
  }
}
