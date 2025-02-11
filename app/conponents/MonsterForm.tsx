import React, { useState } from 'react'
import styles from './MonsterForm.module.css';
import { MONSTER_ATTRIBUTES } from '../constants/attributes';

type MonsterFormProps = {
    onSubmit: (description: string, attribute: string) =>void;
    isGeneratedMonsterImg: boolean;
};

function MonsterForm({onSubmit, isGeneratedMonsterImg}: MonsterFormProps) {
    const [description, setDescription] = useState('');
    const [attribute, steAttribute] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(description, attribute);
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                    モンスターの特徴
                </label>
                <input 
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='例： cute'
                required
                className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="attribute" className={styles.label}>
                    モンスターの属性を選択
                </label>
                <select
                id="attribute"
                value={attribute}
                onChange={(e) => steAttribute(e.target.value)}
                required
                className={styles.select}
                >
                <option value="">選択してください</option>
                {MONSTER_ATTRIBUTES.map((attr) => (
                    <option key={attr.en} value={attr.en}>
                        {attr.ja}
                    </option>
                ))}
                </select>
            </div>
            <button type='submit' className={styles.button}>
                {isGeneratedMonsterImg 
                ? "再度画像を生成しなおす" 
                : "モンスター生成"}
            </button>
        </form>

    );
    
};

export default MonsterForm