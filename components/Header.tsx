'use client'

import Image from "next/image";
import {Route} from "@/enum";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export const Header = () => {
    const t = useTranslations()
    const pathname = usePathname()


    return (
        <header>
            <div className="main-container inner">
                <Link href={Route.HOME} className="flex gap-2 items-center">
                    <Image src="logo.svg" width={40} height={40} alt="Crypto-Pulse logo" />
                    <span className={'text-primary font-semibold text-xl'}>Crypto-Pulse</span>
                </Link>
                <nav>
                    <Link href={Route.HOME} className={cn('nav-link is-home', {
                        'is-active': pathname === Route.HOME
                    })}>
                        {t('header.home')}
                    </Link>
                    {/*<p>*/}
                    {/*    Modal*/}
                    {/*</p>*/}
                    <Link href={Route.COINS} className={cn({'is-active': pathname === Route.COINS})}>{t('header.coins')}</Link>
                </nav>
            </div>
        </header>
    )
}
