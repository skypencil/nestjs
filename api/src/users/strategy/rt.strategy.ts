import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
    constructor(private conf: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: conf.get("RT_JWT_TOKEN"),
            passReqToCallback: true
        })
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim()
        return {
            ...payload,
            refreshToken
        }
    }
}