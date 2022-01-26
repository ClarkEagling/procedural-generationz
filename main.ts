namespace SpriteKind {
    export const badProjectile = SpriteKind.create()
    export const Key = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    platformCount = 0
    scene.setBackgroundColor(5)
    info.changeScoreBy(1000)
    music.beamUp.play()
    game.splash("nice!")
    MakeLevel()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (facingLeft == 1) {
        frogSpit = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 6 6 6 6 6 6 6 6 1 1 . . . . 
            . 6 6 8 8 8 8 8 8 9 6 1 1 1 1 . 
            . 6 6 8 8 8 8 9 9 6 6 6 1 1 . . 
            . . 6 6 6 6 6 6 6 6 1 1 1 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, -300, 0)
    } else if (facingLeft == 0) {
        frogSpit = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 1 1 1 6 6 6 6 6 6 6 6 . . 
            . . 1 1 6 6 6 9 9 8 8 8 8 6 6 . 
            . 1 1 1 1 6 9 8 8 8 8 8 8 6 6 . 
            . . . . 1 1 6 6 6 6 6 6 6 6 . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 300, 0)
    }
    info.changeScoreBy(-1)
    sfxSpit.play()
})
function MakePlatzBar () {
    platzBar = statusbars.create(20, 4, StatusBarKind.Energy)
    platzBar.setLabel("platz")
    platzBar.positionDirection(CollisionDirection.Top)
    platzBar.setOffsetPadding(0, 8)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jumpEnergy > 0) {
        mySprite.ay = mySprite.ay * -1
        pause(350)
        mySprite.ay = mySprite.ay * -1
        jumpergy.value += -25
        jumpEnergy += -1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.badProjectile, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(10)
    sfxSpitHit.play()
    if (jumpEnergy < 4) {
        jumpEnergy += 1
        jumpergy.value += 25
    }
})
function MakeVertPosBar () {
    vertBar = statusbars.create(20, 4, StatusBarKind.Health)
    vertBar.positionDirection(CollisionDirection.Bottom)
    vertBar.setBarSize(0, 4)
    vertBar.setOffsetPadding(0, 3)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.badProjectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    music.zapped.play()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    mySprite.destroy()
    game.over(false, effects.splatter)
})
function MakeMySprite () {
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . 7 7 7 7 7 7 7 . . . 
        . . . . . 7 7 1 1 f 7 7 7 . . . 
        . . . . 7 7 7 1 1 1 7 7 7 7 . . 
        . . . . 7 f 7 7 7 7 7 7 7 7 . . 
        . . . . 7 f f f f f f f f 7 7 . 
        . . . . 7 7 7 2 2 7 7 7 7 . . . 
        . . . 7 7 7 7 7 7 7 . . . . . . 
        . . 7 7 7 7 7 7 7 7 7 . . . . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 . . . 7 7 7 7 . 7 7 7 . 
        . . . 7 7 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    animation.runImageAnimation(
    mySprite,
    [img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e e 7 7 . 7 7 . . . . 
        . . . . . . . c c . c 7 7 . . . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e e 7 7 . 7 7 . . . . 
        . . . . . . . c c . c 7 7 . . . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e 7 7 . . 7 7 7 . . . 
        . . . . . c c 7 7 . c c c . . . 
        `,img`
        . . . . . . . 7 7 7 7 7 7 7 . . 
        . . . . . 7 7 7 7 7 1 f 7 7 7 . 
        . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
        . . . . 7 6 7 7 7 7 7 7 7 7 . . 
        . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
        . . . 7 7 7 7 7 7 7 2 2 f f f 7 
        . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
        . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
        . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
        . . 7 6 7 7 7 7 7 7 7 . . e e . 
        . . 7 7 7 7 7 7 7 7 7 7 . . . . 
        . . e 7 7 7 7 7 e e 7 7 . . . . 
        . . . e e e 7 7 . . 7 7 7 . . . 
        . . . . . c c 7 7 . c c c . . . 
        `],
    333,
    true
    )
    controller.moveSprite(mySprite, 135, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerPlatforms < 3) {
        tiles.setTileAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), assets.tile`myTile1`)
        tiles.setWallAt(tiles.locationInDirection(tiles.locationOfSprite(mySprite), CollisionDirection.Bottom), true)
        music.knock.play()
        playerPlatforms += 1
        platzBar.value += -33
    }
})
function MakeLevel () {
    scene.setBackgroundColor(15)
    playerPlatforms = 0
    jumpEnergy = 4
    platzBar.value += 99
    tiles.setTilemap(tilemap`level2`)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    while (platformCount < 160) {
        rowRandom = randint(5, 95)
        colRandom = randint(0, 15)
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom, rowRandom), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom + 1, rowRandom + 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom - 1, rowRandom - 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom + 1, rowRandom - 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom - 1, rowRandom + 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom + 0, rowRandom - 1), assets.tile`transparency16`) && (tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom - 0, rowRandom + 1), assets.tile`transparency16`) && tiles.tileAtLocationEquals(tiles.getTileLocation(colRandom, rowRandom - 2), assets.tile`transparency16`)))))))) {
            tiles.setTileAt(tiles.getTileLocation(colRandom, rowRandom), sprites.builtin.oceanDepths1)
            tiles.setWallAt(tiles.getTileLocation(colRandom, rowRandom), true)
        }
        platformCount += 1
    }
    key1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . 5 5 . . . 
        . . . . . . . . . . 5 5 5 5 . . 
        . . . . . . . . . 5 5 5 5 5 . . 
        . . . . . . . . 5 5 5 4 4 5 5 . 
        . . . . . . . 5 5 5 5 5 4 4 5 5 
        . . . . . . 5 5 4 4 4 5 5 . 4 4 
        . . . . . 5 5 4 . . . 4 5 5 . . 
        . . . . 5 5 4 . . . . . 4 4 . . 
        . 5 5 5 5 4 . . . . . . . . . . 
        . 5 4 4 5 . . . . . . . . . . . 
        . 5 . . 5 . . . . . . . . . . . 
        . 5 5 5 5 . . . . . . . . . . . 
        . 4 4 4 4 . . . . . . . . . . . 
        `, SpriteKind.Key)
    tiles.placeOnRandomTile(key1, sprites.builtin.oceanDepths1)
}
info.onLifeZero(function () {
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile`)
    music.bigCrash.play()
    info.setLife(3)
})
function MakeBaddies () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        myEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . d d d d d d d . . . . . 
            . . d d c c c c c c c d d . . . 
            . d d c c c c c c c c c d d . . 
            . d c c b b b b b b b c c d . . 
            d b c b b d d d d d b b c b d . 
            d b c b d b b b b b d b c b d . 
            d b c b d b d d d b d b c b d . 
            d b c b d b d c d b d b c b d . 
            d b c b d b d d d b d b c b d . 
            d b c b d b b b b b d b c b d . 
            d b c b b d d d d d b b c b d . 
            . d b c b b b b b b b c b d . . 
            . d d b c c c c c c c b d d . . 
            . . d d b b b b b b b d d . . . 
            . . . . d d d d d d d . . . . . 
            `, SpriteKind.Enemy)
        animation.runImageAnimation(
        myEnemy,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 7 7 7 . . . . . . 
            . . . . . 7 7 7 7 7 7 7 . . . . 
            . . . . . 7 f 1 7 f 1 7 . . . . 
            . . . . 7 7 7 7 7 7 7 7 7 . . . 
            . . . 6 6 7 6 6 6 7 7 6 6 . . . 
            . . b b b b b b b 6 6 b b b . . 
            . 3 3 b 3 3 3 3 3 3 3 3 3 b 3 . 
            a a a b a a 3 a a a a 3 a b b a 
            c a a c c a a a c c c a a c c c 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 7 7 7 . . . . . . 
            . . . . . 7 7 7 7 7 7 7 . . . . 
            . . . . . 7 1 f 7 1 f 7 . . . . 
            . . . . 7 7 7 7 7 7 7 7 7 . . . 
            . . . 6 6 7 6 6 6 7 7 6 6 . . . 
            . . b b b b b b b 6 6 b b b . . 
            . 3 3 b 3 3 3 3 3 3 3 3 3 b 3 . 
            a a a b a a 3 a a a a 3 a b b a 
            c a a c c a a a c c c a a c c c 
            `],
        500,
        true
        )
        tiles.placeOnTile(myEnemy, value)
        myEnemy.ay = 333
    }
}
function MakeJumpergyBar () {
    jumpergy = statusbars.create(20, 4, StatusBarKind.Energy)
    jumpergy.setLabel("jumpz")
    jumpergy.positionDirection(CollisionDirection.Bottom)
    jumpergy.setOffsetPadding(0, 8)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.coolRadial, 200)
    info.changeScoreBy(10)
    sfxSpitHit.play()
    if (jumpEnergy < 4) {
        jumpEnergy += 1
        jumpergy.value += 25
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y <= otherSprite.y) {
        otherSprite.destroy(effects.confetti, 200)
        sprite.vy = -222
        info.changeScoreBy(10)
        sfxSpitHit.play()
        if (jumpEnergy < 4) {
            jumpEnergy += 1
            jumpergy.value += 25
        }
    } else {
        otherSprite.destroy()
        info.changeLifeBy(-1)
        music.zapped.play()
    }
})
let hurtBolt: Sprite = null
let myEnemy: Sprite = null
let key1: Sprite = null
let colRandom = 0
let rowRandom = 0
let playerPlatforms = 0
let vertBar: StatusBarSprite = null
let jumpergy: StatusBarSprite = null
let jumpEnergy = 0
let platzBar: StatusBarSprite = null
let mySprite: Sprite = null
let frogSpit: Sprite = null
let facingLeft = 0
let platformCount = 0
let sfxSpitHit: SoundBuffer = null
let sfxSpit: SoundBuffer = null
game.showLongText("This is Frob... A is Enerjump,    B is Spit, Down arrow drops a Plat", DialogLayout.Center)
let levelNumber = 0
MakeMySprite()
MakePlatzBar()
MakeVertPosBar()
MakeLevel()
MakeBaddies()
MakeJumpergyBar()
let sfxJump = soundEffects.createSound(soundEffects.waveNumber(WaveType.Square50), 100, 0, 440)
let sfxFire = soundEffects.createSound(soundEffects.waveNumber(WaveType.Triangle), 150, 330, 0)
sfxSpit = soundEffects.createSound(soundEffects.waveNumber(WaveType.WhiteNoise), 100, 2000, 0)
sfxSpitHit = soundEffects.createSound(soundEffects.waveNumber(WaveType.TunableNoise), 200, 2500, 440, 255, 0)
game.onUpdate(function () {
    if (controller.left.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . . 7 7 . 7 7 e e e e . . . 
            . . . 7 7 c . c c . . . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . . 7 7 . 7 7 e e e e . . . 
            . . . 7 7 c . c c . . . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . 7 7 7 . . 7 7 e e e . . . 
            . . . c c c . 7 7 c c . . . . . 
            `,img`
            . . 7 7 7 7 7 7 7 . . . . . . . 
            . 7 7 7 f 1 7 7 7 7 7 . . . . . 
            . 7 7 7 1 1 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 6 7 . . . . 
            7 7 7 7 7 2 7 7 7 7 7 7 7 . . . 
            7 f f f 2 2 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 6 7 7 7 7 7 . . 
            e e 7 7 7 7 7 7 7 7 7 6 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 e e 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 . . 7 7 7 7 6 7 7 7 7 . . 
            . e e . . 7 7 7 7 7 7 7 6 7 . . 
            . . . . 7 7 7 7 7 7 7 7 7 7 . . 
            . . . . 7 7 e e 7 7 7 7 7 e . . 
            . . . 7 7 7 . . 7 7 e e e . . . 
            . . . c c c . 7 7 c c . . . . . 
            `],
        333,
        true
        )
        facingLeft = 1
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e e 7 7 . 7 7 . . . . 
            . . . . . . . c c . c 7 7 . . . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e e 7 7 . 7 7 . . . . 
            . . . . . . . c c . c 7 7 . . . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e 7 7 . . 7 7 7 . . . 
            . . . . . c c 7 7 . c c c . . . 
            `,img`
            . . . . . . . 7 7 7 7 7 7 7 . . 
            . . . . . 7 7 7 7 7 1 f 7 7 7 . 
            . . . . 7 7 7 7 7 7 1 1 7 7 7 . 
            . . . . 7 6 7 7 7 7 7 7 7 7 . . 
            . . . 7 7 7 7 7 7 7 2 7 7 7 7 7 
            . . . 7 7 7 7 7 7 7 2 2 f f f 7 
            . . 7 7 7 7 7 6 7 7 7 7 7 7 7 7 
            . . 7 7 6 7 7 7 7 7 7 7 7 7 e e 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . . 7 7 7 7 7 7 7 7 7 e e 7 . . 
            . . 7 7 7 7 6 7 7 7 7 . . 7 7 . 
            . . 7 6 7 7 7 7 7 7 7 . . e e . 
            . . 7 7 7 7 7 7 7 7 7 7 . . . . 
            . . e 7 7 7 7 7 e e 7 7 . . . . 
            . . . e e e 7 7 . . 7 7 7 . . . 
            . . . . . c c 7 7 . c c c . . . 
            `],
        333,
        true
        )
        facingLeft = 0
    }
    vertBar.setLabel(convertToText(Math.round(mySprite.y)))
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -270
        mySprite.startEffect(effects.trail, 150)
        sfxJump.play()
    }
})
game.onUpdateInterval(1500, function () {
    hurtBolt = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 4 4 4 4 2 2 . . . . 
        . . . . 2 2 4 5 5 4 2 2 . . . . 
        . . . . 2 4 4 5 5 4 4 2 . . . . 
        . . . . 2 4 5 5 5 4 4 2 . . . . 
        . . . . 2 4 5 5 4 4 2 2 . . . . 
        . . . . 2 2 4 5 4 2 2 c . . . . 
        . . . . c 2 4 4 4 2 2 . . . . . 
        . . . . . 2 2 4 2 2 c . . . . . 
        . . . . . c 2 2 2 c . . . . . . 
        `, 0, -74)
    hurtBolt.x = randint(10, 240)
    hurtBolt.setKind(SpriteKind.badProjectile)
    sfxFire.play()
})
