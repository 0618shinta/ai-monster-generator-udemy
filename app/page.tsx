'use client';

import { useState } from 'react';
import styles from './page.module.css';
import MonsterForm from './conponents/MonsterForm';
import fetchMonsterImg from './lib/getImgApi';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({ description: '', attribute: ''});
  const [monsterImg, setMonsterImg] = useState('');

  const handleFormSubmit = async (description: string, attribute: string) => {
    setFormData({ description, attribute});
    const imageUrl: string = await fetchMonsterImg({description, attribute})
    setMonsterImg(imageUrl);
  };

  const handleXShare = () => {
    const shareUrl = encodeURIComponent(monsterImg)
    const xText = encodeURIComponent(`
      ついに発見!${formData.description}${formData.attribute}タイプの新しいモンスター!? \n #モンスター召喚`
    );
    const xUrl = `https://twitter.com/intent/tweet?text=${xText}&url=${shareUrl}`
    window.open(xUrl, '_blank' );
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Ai Monster Generator</h1>
        <MonsterForm onSubmit={handleFormSubmit}
          isGeneratedMonsterImg={!!monsterImg} />
        <div className={styles.imageContainer}>
          {monsterImg && (
            <>
              <Image
              src={monsterImg}
              alt="生成されたモンスターの画像"
              className={styles.monsterImage}
              width={300}
              height={300}
              />
              <button
                className={styles.shareButton}
                onClick={handleXShare}
              >
                X（旧Twitter）にシェアする
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}