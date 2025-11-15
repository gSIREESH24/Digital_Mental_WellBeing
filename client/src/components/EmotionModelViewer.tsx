import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX, useAnimations } from "@react-three/drei";
import * as THREE from "three";

type EmotionModelViewerProps = {
  emotion: "happy" | "sad" | "angry" | "idle" | "fear" | "surprise";
};

function Model({ emotion }: { emotion: "happy" | "sad" | "angry" | "idle" | "fear" | "surprise" }) {
  const groupRef = useRef<THREE.Group>(null);
  const previousEmotionRef = useRef<string | null>(null);
  
  // Load the appropriate FBX file based on emotion
  // Map emotion to actual file names (Surprised.fbx has capital S and "ed")
  const getModelPath = (emotion: string): string => {
    if (emotion === "surprise") {
      return "/models/Surprised.fbx";
    }
    return `/models/${emotion}.fbx`;
  };
  
  const modelPath = getModelPath(emotion);
  const fbx = useFBX(modelPath);
  
  // Extract animations from the FBX file
  // FBX files loaded with useFBX have animations in the animations property
  const animations = fbx.animations || [];
  const { actions, mixer } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Scale and center the model to fit the screen when it loads
    if (fbx) {
      // Reset scale and position first
      fbx.scale.set(1, 1, 1);
      fbx.position.set(0, 0, 0);
      fbx.rotation.set(0, 0, 0);
      
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(fbx);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      if (maxDim > 0) {
        // Scale to fit nicely in the viewport - ensure full body including head is visible
        const scale = Math.min(3.0 / maxDim, 2.2 / size.y); // Scale based on height to show full body
        fbx.scale.set(scale, scale, scale);
        
        // Recalculate bounding box after scaling
        const newBox = new THREE.Box3().setFromObject(fbx);
        const newCenter = newBox.getCenter(new THREE.Vector3());
        const newSize = newBox.getSize(new THREE.Vector3());
        
        // Center the model properly - center it at origin so full body including head is visible
        fbx.position.x = -newCenter.x;
        fbx.position.y = -newCenter.y; // Center vertically so head and feet are both visible
        fbx.position.z = -newCenter.z;
      }
    }
  }, [fbx, emotion]);

  // Play animations when they're available and emotion changes
  useEffect(() => {
    // Reset mixer when emotion changes
    if (mixer && previousEmotionRef.current !== emotion) {
      mixer.stopAllAction();
      previousEmotionRef.current = emotion;
    }

    if (actions && Object.keys(actions).length > 0) {
      // Stop all animations first
      Object.values(actions).forEach((action) => {
        if (action) {
          action.stop();
          action.reset();
        }
      });

      // Small delay to ensure cleanup is complete
      const timer = setTimeout(() => {
        // Play all available animations
        Object.values(actions).forEach((action) => {
          if (action) {
            action.reset();
            action.setLoop(THREE.LoopRepeat);
            action.play();
          }
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        // Cleanup: stop all animations when component unmounts or emotion changes
        if (actions) {
          Object.values(actions).forEach((action) => {
            if (action) {
              action.stop();
              action.reset();
            }
          });
        }
        if (mixer) {
          mixer.stopAllAction();
        }
      };
    }
  }, [actions, mixer, emotion]);

  // Update animation mixer each frame
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={fbx} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export function EmotionModelViewer({ emotion }: EmotionModelViewerProps) {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-primary/10 to-secondary/20 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <Suspense fallback={<LoadingFallback />}>
          <Model key={emotion} emotion={emotion} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          minDistance={4}
          maxDistance={6}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}

// Note: FBX files are loaded on-demand by useFBX
// Preloading can be added if needed using useFBX.preload()

