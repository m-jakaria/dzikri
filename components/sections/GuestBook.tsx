import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getRemarks, RemarkDoc } from '../../lib/api'
import Annotation from '../Icons/Annotation'
import Mail from '../Icons/Mail'
import Amplop from '../modals/Amplop'
import Remark from '../modals/Remark'

interface GuestBookProps {
    isActive: boolean
}

const GuestBook: React.FC<GuestBookProps> = ({ isActive }) => {
    const [remarks, setRemarks] = useState<RemarkDoc[]>([])
    const [remarkModalOpen, setRemarkModalOpen] = useState(false)
    const [amplopModalOpen, setAmplopModalOpen] = useState(false)
    const [transitionDone, setTransitionDone] = useState(false)
    const messageDivRef = useRef<HTMLDivElement>(null)

    const handleTransitionEnd: React.TransitionEventHandler<
        HTMLDivElement
    > = event => {
        setTransitionDone(true)
    }

    const handleMessageWheel: React.WheelEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
    }

    const handleMessageTouch = useCallback((e: TouchEvent) => {
        e.stopPropagation()
    }, [])

    useEffect(() => {
        async function _getRemarks() {
            const remarks = await getRemarks()

            // setRemarks(remarks)
        }

        _getRemarks()
    }, [])

    useEffect(() => {
        const instance = messageDivRef.current

        instance!.addEventListener('touchstart', handleMessageTouch, {
            passive: true,
        })
        instance!.addEventListener('touchmove', handleMessageTouch, {
            passive: true,
        })

        return () => {
            instance!.removeEventListener('touchstart', handleMessageTouch)
            instance!.removeEventListener('touchmove', handleMessageTouch)
        }
    }, [handleMessageTouch])

    const CLASESS = [
        transitionDone
            ? ''
            : (isActive ? 'scale-100 translate-x-0' : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[400ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'scale-100 translate-x-0' : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[900ms] ease-in-out',
        transitionDone
            ? ''
            : (isActive ? 'scale-100 translate-x-0' : 'scale-0 translate-x-full pointer-events-none') +
              'transition-transform duration-[700ms] delay-[1100ms] ease-in-out',
    ]

    return (
        <>
            <div className={`${CLASESS[0]} w-full`}>
                <h1 className="text-2xl text-center md:text-4xl laptop:text-3xl 2xl:text-4xl font-HinaMincho">
                    VIDEO KAMI
                </h1>
            </div>
            <div
                className={`${CLASESS[1]} flex flex-col w-full px-2 mt-8 md:px-20 laptop:px-10 2xl:px-20 md:mt-14 lg:mt-28 laptop:mt-6 2xl:mt-24 font-Inter`}
                onWheel={handleMessageWheel}
                ref={messageDivRef}
            >
                     <iframe src="https://drive.google.com/file/d/15_wCzlmbnxD5aYEe_QeG-qQU6s75qG9C/preview" width="640" height="480" allow="autoplay"></iframe>
                        {/* <video width="320" height="240" loop autoPlay>
                            <source src="public/video/vid.mp4" type="video/mp4"></source>
                        </video> */}
            </div>

            <div
                className={`${CLASESS[2]} flex flex-row flex-wrap items-center justify-center w-full mt-4 font-Inter`}
                onTransitionEnd={handleTransitionEnd}
            >
                <button
                    type="button"
                    className="flex items-center px-3 py-1 mr-4 text-sm rounded-2xl bg-gold text-blue-floral hover:bg-gold2"
                    onClick={() => setRemarkModalOpen(true)}
                >
                    <span className="w-5 h-5 text-blue-floral">
                        <Annotation />
                    </span>
                    <span className="ml-1">Kirim Ucapan</span>
                </button>

                {/* <button
                    type="button"
                    className="flex items-center px-3 py-1 text-sm rounded-2xl bg-gold text-blue-floral hover:bg-gold2"
                    onClick={() => setAmplopModalOpen(true)}
                >
                    <span className="w-5 h-5 text-blue-floral">
                        <Mail />
                    </span>
                    <span className="ml-1">Kirim Amplop</span>
                </button> */}
            </div>

            <Remark
                messageDivRef={messageDivRef}
                setRemarks={setRemarks}
                open={remarkModalOpen}
                setOpen={setRemarkModalOpen}
            />

            <Amplop
                messageDivRef={messageDivRef}
                setRemarks={setRemarks}
                open={amplopModalOpen}
                setOpen={setAmplopModalOpen}
            />
        </>
    )
}

export default GuestBook
