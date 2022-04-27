/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pause32, Play32 } from '@carbon/icons-react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

import styles from './video.module.scss'

const Video = ({ autoPlay, vimeoId, title, src, poster, muted, ...props }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const videoRef = useRef(null)
  const iframeRef = useRef(null)
  const buttonClassName = clsx(styles['video-button'], {
    [styles['video--is-playing']]: isPlaying
  })

  // React doesn't handle the muted attribute well
  // https://github.com/facebook/react/issues/10389#issuecomment-605689475
  useEffect(() => {
    if (muted && videoRef.current) {
      videoRef.current.setAttribute('muted', '')
    }
  }, [muted])

  if (vimeoId) {
    return (
      <div className={styles['video-container']}>
        <div className={clsx(styles.video, styles.vimeo)}>
          <div className="embedVideo-container">
            <iframe
              allow="autoplay"
              title={title}
              src={`https://player.vimeo.com/video/${vimeoId}`}
              ref={iframeRef}
              width="640"
              height="360"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    )
  }

  function onClick(e) {
    e.stopPropagation()
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      return
    }

    return videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function onEnded() {
    setIsPlaying(false)
  }

  function onKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
        return
      }
      return videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className={styles['video-container']}>
      <div
        className={buttonClassName}
        role="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex="0"
      >
        {isPlaying ? <Pause32 /> : <Play32 />}
        <span className="cds--assistive-text">{isPlaying ? 'Pause' : 'Play'}</span>
      </div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay={autoPlay}
        className={styles.video}
        type="video/mp4"
        ref={videoRef}
        onEnded={onEnded}
        src={src}
        poster={typeof poster === 'object' ? poster.src : poster}
        {...props}
      />
    </div>
  )
}

Video.propTypes = {
  autoPlay: PropTypes.bool,
  children: PropTypes.element,
  poster: PropTypes.oneOf(PropTypes.string, PropTypes.object),
  src: PropTypes.string,
  title: PropTypes.string,
  videoSourceValidator: (props) => {
    if (!props.vimeoId && !props.src) {
      return new Error("The Video component requires either a 'vimeoId' Or a 'src' prop")
    }
    if (props.vimeoId && props.src) {
      return new Error(
        "You can only specify one source for the Video component. Use either the 'vimeoId' OR the 'src' prop."
      )
    }
    if (props.vimeoId && props.poster) {
      return new Error(
        "You can't specify a poster for vimeo videos. You can control the poster image from the Vimeo control panel"
      )
    }
    if (props.vimeoId && props.children) {
      return new Error(
        "You can't specify children/tracks for vimeo videos. You can control the captions from the Vimeo control panel"
      )
    }
  },
  vimeoId: PropTypes.string
}

Video.defaultProps = {
  autoPlay: false
}

export default Video
